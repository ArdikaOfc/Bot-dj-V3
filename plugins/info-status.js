import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { Canvas, loadImage } from 'skia-canvas';
import { format } from 'date-fns';

const execAsync = promisify(exec);
const MAX_HISTORY_POINTS = 60;
let pingHistory = [];

const tempDir = './temp';

const ensureTempDir = () => {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
};

const waitForFile = (filePath, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkFile = () => {
            if (fs.existsSync(filePath)) {
                try {
                    const stats = fs.statSync(filePath);
                    if (stats.size > 0) {
                        resolve(true);
                        return;
                    }
                } catch (err) {
                    if (Date.now() - startTime > timeout) {
                        reject(new Error(`File check timeout: ${filePath}`));
                        return;
                    }
                }
            }
            if (Date.now() - startTime > timeout) {
                reject(new Error(`File not found after timeout: ${filePath}`));
                return;
            }
            setTimeout(checkFile, 100);
        };
        checkFile();
    });
};

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${['B', 'KiB', 'MiB', 'GiB', 'TiB'][i]}`;
};

const parseUptime = (uptimeStr) => {
    let totalSeconds = 0;
    
    const daysMatch = uptimeStr.match(/(\d+)\s*days?/);
    const hoursMatch = uptimeStr.match(/(\d+)\s*hours?/);
    const minsMatch = uptimeStr.match(/(\d+)\s*mins?/);
    
    if (daysMatch) totalSeconds += parseInt(daysMatch[1]) * 86400;
    if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
    if (minsMatch) totalSeconds += parseInt(minsMatch[1]) * 60;
    
    return totalSeconds;
};

const formatUptime = (sec) => {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
};

const parseMemory = (memoryStr) => {
    const match = memoryStr.match(/([\d.]+)([KMGTP]?iB)\s*\/\s*([\d.]+)([KMGTP]?iB)/i);
    if (match) {
        const used = parseFloat(match[1]);
        const usedUnit = match[2];
        const total = parseFloat(match[3]);
        const totalUnit = match[4];
        
        const units = { 'B': 1, 'KiB': 1024, 'MiB': 1024**2, 'GiB': 1024**3, 'TiB': 1024**4 };
        const usedBytes = used * (units[usedUnit] || 1);
        const totalBytes = total * (units[totalUnit] || 1);
        
        return {
            used: usedBytes,
            total: totalBytes,
            percent: Math.round((usedBytes / totalBytes) * 100)
        };
    }
    return { used: 0, total: 0, percent: 0 };
};

const getCpuUsage = async () => {
    try {
        const { stdout } = await execAsync("grep 'cpu ' /proc/stat");
        const fields = stdout.split(/\s+/).slice(1, 8).map(Number);
        const total = fields.reduce((a, b) => a + b, 0);
        const idle = fields[3];
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { stdout: stdout2 } = await execAsync("grep 'cpu ' /proc/stat");
        const fields2 = stdout2.split(/\s+/).slice(1, 8).map(Number);
        const total2 = fields2.reduce((a, b) => a + b, 0);
        const idle2 = fields2[3];
        
        const totalDiff = total2 - total;
        const idleDiff = idle2 - idle;
        
        return Math.max(0, Math.round(100 - (idleDiff / totalDiff) * 100));
    } catch (error) {
        console.error('Error getting CPU usage:', error);
        return 50;
    }
};
const getDiskUsage = () => {
    try {
        const stats = fs.statfsSync('/');
        const total = stats.blocks * stats.bsize;
        const free = stats.bfree * stats.bsize;
        const used = total - free;
        return {
            total: formatBytes(total),
            used: formatBytes(used),
            percent: Math.round((used / total) * 100)
        };
    } catch (e) {
        return { total: 'N/A', used: 'N/A', percent: 0 };
    }
};

const getPing = () => {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const req = https.get('https://www.google.com', (res) => {
            res.resume();
            resolve(Date.now() - startTime);
        });
        req.on('error', () => resolve(-1));
        req.setTimeout(5000, () => {
            req.destroy();
            resolve(-1);
        });
    });
};

const getNeofetchInfo = async () => {
    try {
        const { stdout } = await execAsync('neofetch --json');
        const neofetchData = JSON.parse(stdout);
        
        const memoryInfo = parseMemory(neofetchData.Memory || '0MiB / 0MiB');
        const uptimeSeconds = parseUptime(neofetchData.Uptime || '0 mins');
        
        return {
            cpu: neofetchData.CPU || 'Unknown CPU',
            os: neofetchData.OS || 'Unknown OS',
            kernel: neofetchData.Kernel || 'Unknown Kernel',
            host: neofetchData.Host || 'Unknown Host',
            memory: neofetchData.Memory || 'Unknown Memory',
            memoryUsed: memoryInfo.used,
            memoryTotal: memoryInfo.total,
            memoryPercent: memoryInfo.percent,
            uptime: uptimeSeconds,
            packages: neofetchData.Packages || 'Unknown',
            shell: neofetchData.Shell || 'Unknown',
            resolution: neofetchData.Resolution || 'Unknown',
            terminal: neofetchData.Terminal || 'Unknown',
            gpu: neofetchData.GPU || 'Unknown GPU'
        };
    } catch (error) {
        console.error('Error getting neofetch info:', error);
        return {
            cpu: 'Unknown CPU',
            os: 'Unknown OS',
            kernel: 'Unknown Kernel',
            host: 'Unknown Host',
            memory: 'Unknown Memory',
            memoryUsed: 0,
            memoryTotal: 0,
            memoryPercent: 0,
            uptime: 0,
            packages: 'Unknown',
            shell: 'Unknown',
            resolution: 'Unknown',
            terminal: 'Unknown',
            gpu: 'Unknown GPU'
        };
    }
};

const getCpuCores = async () => {
    try {
        const { stdout } = await execAsync('nproc');
        return parseInt(stdout.trim()) || 1;
    } catch (error) {
        console.error('Error getting CPU cores:', error);
        return 1;
    }
};
const getHostname = async () => {
    try {
        const { stdout } = await execAsync('hostname');
        return stdout.trim() || 'Unknown Host';
    } catch (error) {
        console.error('Error getting hostname:', error);
        return 'Unknown Host';
    }
};

const getNodeVersion = async () => {
    try {
        const { stdout } = await execAsync('node -v');
        return stdout.trim().replace('v', '') || 'Unknown';
    } catch (error) {
        console.error('Error getting Node.js version:', error);
        return 'Unknown';
    }
};

const truncateText = (ctx, text, maxWidth) => {
    let width = ctx.measureText(text).width;
    const ellipsis = '…';
    const ellipsisWidth = ctx.measureText(ellipsis).width;
    if (width <= maxWidth) return text;
    while (width >= maxWidth - ellipsisWidth) {
        text = text.slice(0, -1);
        width = ctx.measureText(text).width;
    }
    return text + ellipsis;
};

let handler = async (m, { conn }) => {
    try {
        ensureTempDir();
        
        const [cpuLoad, currentPing, neofetchInfo, cpuCores, hostname, nodeVersion] = await Promise.all([
            getCpuUsage(), 
            getPing(), 
            getNeofetchInfo(),
            getCpuCores(),
            getHostname(),
            getNodeVersion()
        ]);

        if (pingHistory.length === 0) {
            const initialPing = currentPing > 0 ? currentPing : 100;
            pingHistory = new Array(MAX_HISTORY_POINTS).fill(initialPing);
        }
        pingHistory.push(currentPing > 0 ? currentPing : 100);
        pingHistory.shift();

        const uptime = neofetchInfo.uptime;
        const memPercent = neofetchInfo.memoryPercent;
        const memUsed = neofetchInfo.memoryUsed;
        const memTotal = neofetchInfo.memoryTotal;
        const osInfo = neofetchInfo.os;
        const cpuModel = neofetchInfo.cpu;
        const packages = neofetchInfo.packages;
        const gpu = neofetchInfo.gpu;
        const diskInfo = getDiskUsage();

        const width = 1200, height = 1600;
        const canvas = new Canvas(width, height);
        const ctx = canvas.getContext('2d');

        const colors = {
            bg: '#0f172a', card: '#1e293b', border: '#334155',
            textPrimary: '#f1f5f9', textSecondary: '#94a3b8',
            cpu: '#ef4444', memory: '#0ea5e9', disk: '#8b5cf6',
            uptime: '#f59e0b', os: '#ec4899', model: '#10b981',
            ping: '#3b82f6', header: '#1e293b',
            packages: '#ec4899', gpu: '#8b5cf6', node: '#10b981',
            critical: '#ef4444', warning: '#f59e0b', good: '#10b981'
        };

        function roundRect(ctx, x, y, w, h, r) {
            if (w < 2 * r) r = w / 2; if (h < 2 * r) r = h / 2;
            ctx.beginPath(); ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath(); return ctx;
        }

        async function drawCard(x, y, w, h, title, iconSvg, data, color) {
            ctx.fillStyle = colors.card;
            ctx.strokeStyle = colors.border;
            ctx.lineWidth = 1;
            roundRect(ctx, x, y, w, h, 16).fill();
            roundRect(ctx, x, y, w, h, 16).stroke();

            const icon = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg)}`);    
            ctx.drawImage(icon, x + 20, y + 18, 28, 28);    

            ctx.fillStyle = colors.textSecondary;   
            ctx.font = '600 16px "Segoe UI", sans-serif';    
            ctx.textAlign = 'left'; ctx.fillText(title, x + 60, y + 38);    

            if (data.progress !== undefined) {    
                const progressText = String(data.progress);    
                ctx.font = '700 36px "Segoe UI", sans-serif';   
                ctx.fillStyle = colors.textPrimary;    
                ctx.textBaseline = 'alphabetic'; ctx.fillText(progressText, x + 25, y + 90);    
                    
                const percentWidth = ctx.measureText(progressText).width;    
                ctx.font = '700 20px "Segoe UI", sans-serif';   
                ctx.fillStyle = colors.textSecondary;    
                ctx.fillText('%', x + 25 + percentWidth + 2, y + 90);    

                ctx.font = '500 14px "Segoe UI", sans-serif';    
                ctx.fillText(data.subtext, x + 25, y + 115);    

                const p_width = w - 50, p_x = x + 25, p_y = y + 130;    
                ctx.fillStyle = '#334155';   
                roundRect(ctx, p_x, p_y, p_width, 8, 4).fill();    
                if (data.progress > 0) {    
                    ctx.fillStyle = color;    
                    roundRect(ctx, p_x, p_y, (p_width * data.progress) / 100, 8, 4).fill();    
                }    
                    
                const statusColor = data.progress > 80 ? colors.critical :   
                                 data.progress > 60 ? colors.warning : colors.good;  
                ctx.fillStyle = statusColor;  
                ctx.beginPath();  
                ctx.arc(x + w - 25, y + 25, 8, 0, Math.PI * 2);  
                ctx.fill();  
            } else {    
                ctx.fillStyle = colors.textPrimary;   
                ctx.font = '600 20px "Segoe UI", sans-serif';    
                ctx.fillText(truncateText(ctx, data.text, w - 50), x + 25, y + 95);    
                    
                const statusColor = colors.good;  
                ctx.fillStyle = statusColor;  
                ctx.beginPath();  
                ctx.arc(x + w - 25, y + 25, 8, 0, Math.PI * 2);  
                ctx.fill();  
            }
        }

        function drawPingChart(x, y, w, h, data, color) {
            ctx.fillStyle = colors.card;
            ctx.strokeStyle = colors.border;
            ctx.lineWidth = 1;
            roundRect(ctx, x, y, w, h, 16).fill();
            roundRect(ctx, x, y, w, h, 16).stroke();

            const p = { t: 40, r: 40, b: 40, l: 50 }, cW = w - p.l - p.r, cH = h - p.t - p.b, cX = x + p.l, cY = y + p.t;    
            const validData = data.filter(d => d >= 0), maxVal = Math.max(100, Math.ceil(Math.max(...validData, 0) / 50) * 50);    

            ctx.font = '600 16px "Segoe UI", sans-serif';   
            ctx.fillStyle = colors.textPrimary;   
            ctx.textAlign = 'left';    
            ctx.fillText("Network Latency", x + 20, y + 28);    
            const latestPing = data[data.length - 1];    
            ctx.font = '700 20px "Segoe UI", sans-serif';   
            ctx.fillStyle = color;   
            ctx.textAlign = 'right';    
            ctx.fillText(`${latestPing} ms`, x + w - p.r, y + 28);    

            ctx.strokeStyle = '#334155';   
            ctx.lineWidth = 1;   
            ctx.font = '500 12px "Segoe UI", sans-serif';   
            ctx.fillStyle = colors.textSecondary;   
            ctx.textAlign = 'right';    
            for (let i = 0; i <= 4; i++) {    
                const gridY = cY + (i / 4) * cH, value = maxVal - (i / 4) * maxVal;    
                ctx.fillText(`${Math.round(value)}`, cX - 10, gridY + 4);    
                ctx.beginPath();   
                ctx.moveTo(cX, gridY);   
                ctx.lineTo(cX + cW, gridY);   
                ctx.stroke();    
            }    

            ctx.font = '500 12px "Segoe UI", sans-serif';   
            ctx.textAlign = 'center';    
            const xLabels = ['-60s', '-45s', '-30s', '-15s', 'Now'];    
            for (let i = 0; i < xLabels.length; i++) {    
                const labelX = cX + (i / (xLabels.length - 1)) * cW;    
                ctx.fillText(xLabels[i], labelX, cY + cH + 20);    
            }    
                
            const points = data.map((d, i) => ({   
                x: cX + (i / (data.length - 1)) * cW,   
                y: d < 0 ? cY + cH + 10 : cY + cH - ((d / maxVal) * cH)   
            }));    
            
            ctx.beginPath();   
            ctx.moveTo(points[0].x, points[0].y);    
            for (let i = 0; i < points.length - 1; i++) {    
                const xc = (points[i].x + points[i + 1].x) / 2, yc = (points[i].y + points[i + 1].y) / 2;    
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);    
            }    
            ctx.quadraticCurveTo(points[points.length-2].x, points[points.length-2].y, points[points.length-1].x, points[points.length-1].y);    
            ctx.strokeStyle = color;   
            ctx.lineWidth = 3;   
            ctx.stroke();    

            ctx.save();   
            roundRect(ctx, x, y, w, h, 16);
            ctx.clip('nonzero');
            const fillGradient = ctx.createLinearGradient(0, cY, 0, cY + cH);    
            fillGradient.addColorStop(0, color + '80');   
            fillGradient.addColorStop(1, color + '10');    
            ctx.beginPath();  
            ctx.moveTo(points[0].x, points[0].y);  
            for (let i = 1; i < points.length; i++) {  
                ctx.lineTo(points[i].x, points[i].y);  
            }  
            ctx.lineTo(points[points.length-1].x, cY + cH);  
            ctx.lineTo(cX, cY + cH);  
            ctx.closePath();  
            ctx.fillStyle = fillGradient;   
            ctx.fill();    
            ctx.restore();
        }

        function drawHeader() {
            const headerHeight = 100;
            const headerGradient = ctx.createLinearGradient(0, 0, width, 0);
            headerGradient.addColorStop(0, '#0f172a');
            headerGradient.addColorStop(1, '#1e293b');

            ctx.fillStyle = headerGradient;  
            ctx.fillRect(0, 0, width, headerHeight);  
            
            ctx.fillStyle = '#ffffff';  
            ctx.font = 'bold 36px "Segoe UI", sans-serif';  
            ctx.textAlign = 'center';  
            ctx.fillText('VPS SERVER MONITOR', width/2, 50);  
            
            ctx.fillStyle = colors.textSecondary;  
            ctx.font = '500 18px "Segoe UI", sans-serif';  
            ctx.fillText(`Real-time performance report for ${hostname}`, width/2, 85);  
            
            return headerHeight;
        }
function drawSystemOverview(x, y, w, h) {
            ctx.fillStyle = colors.card;
            roundRect(ctx, x, y, w, h, 16).fill();

            ctx.fillStyle = colors.textPrimary;  
            ctx.font = '600 20px "Segoe UI", sans-serif';  
            ctx.textAlign = 'left';  
            ctx.fillText('System Overview', x + 20, y + 35);  
            
            ctx.fillStyle = colors.textSecondary;  
            ctx.font = '500 16px "Segoe UI", sans-serif';  
            ctx.textAlign = 'left';  
            ctx.fillText(`OS: ${osInfo}`, x + 20, y + 70);  
            ctx.fillText(`CPU: ${cpuCores} cores`, x + 20, y + 100);  
            ctx.fillText(`Uptime: ${formatUptime(uptime)}`, x + 20, y + 130);  
            
            const statusColor = cpuLoad < 80 ? colors.good : colors.critical;  
            ctx.fillStyle = statusColor;  
            ctx.font = '600 16px "Segoe UI", sans-serif';  
            ctx.textAlign = 'right';  
            ctx.fillText(cpuLoad < 80 ? 'Operational' : 'Critical', x + w - 20, y + 35);  
            
            ctx.fillStyle = colors.textPrimary;  
            ctx.textAlign = 'right';  
            ctx.fillText(`Last Ping: ${currentPing > 0 ? currentPing + 'ms' : 'Timeout'}`, x + w - 20, y + 70);  
            ctx.fillText(`Updated: ${format(new Date(), 'HH:mm:ss')}`, x + w - 20, y + 100);  
            
            ctx.strokeStyle = colors.border;  
            ctx.beginPath();  
            ctx.moveTo(x + 20, y + 50);  
            ctx.lineTo(x + w - 20, y + 50);  
            ctx.stroke();
        }

        const headerHeight = drawHeader();

        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, headerHeight, width, height - headerHeight);

        const overviewHeight = 150;
        drawSystemOverview(50, headerHeight + 20, width - 100, overviewHeight);

        const cardW = 340, cardH = 180, gap = 25, startX = 50, startY = headerHeight + overviewHeight + 40;

        const cpuIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${colors.cpu}">
<path d="M6 18H18V6H6V18ZM14 20H10V22H8V20H5C4.44772 20 4 19.5523 4 19V16H2V14H4V10H2V8H4V5C4 4.44772 4.44772 4 5 4H8V2H10V4H14V2H16V4H19C19.5523 4 20 4.44772 20 5V8H22V10H20V14H22V16H20V19C20 19.5523 19.5523 20 19 20H16V22H14V20ZM8 8H16V16H8V8Z"></path>
</svg>`;
        const memoryIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10H21M3 14H21M5 18H19M5 6H19M5 10V14M19 10V14" stroke="${colors.memory}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const diskIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="${colors.disk}" stroke-width="1.5"/><path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="${colors.disk}" stroke-width="1.5"/></svg>`;
        const modelIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5H21M3 11.5H21M3 17.5H21" stroke="${colors.model}" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="${colors.model}" stroke-width="1.5"/></svg>`;
        const osIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 17.5L12 17.5M8 20.5L12 17.5L8 14.5" stroke="${colors.os}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6.5H13C13 6.5 15 6.5 15 8.5C15 10.5 13 10.5 13 10.5H4" stroke="${colors.os}" stroke-width="1.5" stroke-linecap="round"/></svg>`;
        const packagesIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22V12M12 12L22 7M12 12L2 7M22 7V17L12 22M22 7L12 2M12 22L2 17V7L12 2" stroke="${colors.packages}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const gpuIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7H21M3 12H21M3 17H21" stroke="${colors.gpu}" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="${colors.gpu}" stroke-width="1.5"/></svg>`;
        const nodeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${colors.node}">
<path d="M12.8873 1.36173C12.3396 1.03958 11.6604 1.03958 11.1127 1.36173L3.36271 5.92056C2.8282 6.23498 2.5 6.8088 2.5 7.42894V16.571C2.5 17.1912 2.8282 17.765 3.36272 18.0794L5.98596 19.6225C7.31923 20.4068 9 19.4454 9 17.8986V7.74655H7V17.8986L4.5 16.428V7.57193L12 3.16016L19.5 7.57193V16.428L12 20.8398L10.2316 19.7996L9.21757 21.5234L11.1127 22.6382C11.6604 22.9604 12.3396 22.9604 12.8873 22.6382L20.6373 18.0794C21.1718 17.765 21.5 17.1912 21.5 16.571V7.42894C21.5 6.8088 21.1718 6.23498 20.6373 5.92056L12.8873 1.36173ZM13.9999 7.49998C12.6372 7.49998 11.6712 7.85114 11.0504 8.46993C10.4336 9.08484 10.3135 9.80885 10.3135 10.2313C10.3135 10.7862 10.4705 11.289 10.7951 11.7048C11.1076 12.1053 11.5199 12.3537 11.9146 12.5159C12.6341 12.8116 13.5358 12.9086 14.2587 12.9863L14.346 12.9957C15.1774 13.0856 15.7998 13.1627 16.2263 13.3411C16.4189 13.4217 16.4983 13.4954 16.531 13.5379C16.5524 13.5658 16.5934 13.6278 16.5934 13.7977C16.5934 14.0618 16.5027 14.2319 16.2204 14.3926C15.873 14.5904 15.2596 14.7396 14.3368 14.7396C13.4218 14.7396 12.7838 14.5705 12.4192 14.3181C12.1357 14.1218 11.9273 13.821 11.9822 13.1683L9.98923 13.0007C9.88075 14.29 10.3479 15.3167 11.2808 15.9625C12.1325 16.5521 13.2518 16.7396 14.3368 16.7396C15.414 16.7396 16.4289 16.5753 17.2098 16.1307C18.0558 15.6491 18.5934 14.8482 18.5934 13.7977C18.5934 13.2414 18.4381 12.7369 18.1162 12.3184C17.8054 11.9144 17.3942 11.6617 16.9981 11.496C16.2701 11.1915 15.3576 11.0932 14.6296 11.0147H14.6296L14.5609 11.0073C13.7274 10.9172 13.1036 10.8423 12.6748 10.666C12.4808 10.5863 12.4025 10.5137 12.3716 10.4742C12.3528 10.4501 12.3135 10.394 12.3135 10.2313C12.3135 10.1538 12.3363 10.0121 12.4624 9.88637C12.5847 9.76449 12.9618 9.49998 13.9999 9.49998C14.9904 9.49998 15.5674 9.60515 15.897 9.80064C16.1123 9.92838 16.3451 10.1633 16.3761 10.9329L18.3745 10.8524C18.3243 9.60675 17.8694 8.64527 16.9173 8.08051C16.0795 7.58349 15.0094 7.49998 13.9999 7.49998Z"></path>
</svg>`;

        await drawCard(startX, startY, cardW, cardH, 'CPU Usage', cpuIcon, { 
            progress: cpuLoad, 
            subtext: `${cpuCores} Cores` 
        }, colors.cpu);
        
        await drawCard(startX + cardW + gap, startY, cardW, cardH, 'Memory', memoryIcon, { 
            progress: memPercent, 
            subtext: `${formatBytes(memUsed)} / ${formatBytes(memTotal)}` 
        }, colors.memory);
        
        await drawCard(startX + (cardW + gap) * 2, startY, cardW, cardH, 'Disk', diskIcon, { 
            progress: diskInfo.percent, 
            subtext: `${diskInfo.used} / ${diskInfo.total}` 
        }, colors.disk);
        
        const row2Y = startY + cardH + gap;
        await drawCard(startX, row2Y, cardW, cardH, 'CPU Model', modelIcon, { 
            text: cpuModel 
        }, colors.model);
        
        await drawCard(startX + cardW + gap, row2Y, cardW, cardH, 'Operating System', osIcon, { 
            text: osInfo 
        }, colors.os);
        
        await drawCard(startX + (cardW + gap) * 2, row2Y, cardW, cardH, 'Uptime', 
            `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="${colors.uptime}" stroke-width="1.5"/><path d="M12 7V12L16 14" stroke="${colors.uptime}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`, 
            { text: formatUptime(uptime) }, colors.uptime);

        const row3Y = row2Y + cardH + gap;
        await drawCard(startX, row3Y, cardW, cardH, 'Packages', packagesIcon, { 
            text: packages 
        }, colors.packages);
        
        await drawCard(startX + cardW + gap, row3Y, cardW, cardH, 'GPU', gpuIcon, { 
            text: gpu 
        }, colors.gpu);
        
        await drawCard(startX + (cardW + gap) * 2, row3Y, cardW, cardH, 'Node.js Version', nodeIcon, { 
            text: `v${nodeVersion}` 
        }, colors.node);

        const chartY = row3Y + cardH + gap;
        const chartW = width - startX * 2, chartH = 280;
        drawPingChart(startX, chartY, chartW, chartH, pingHistory, colors.ping);

        ctx.fillStyle = colors.textSecondary;
        ctx.font = '500 14px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Report generated on ${format(new Date(), 'dd MMM yyyy HH:mm:ss')} • Enterprise Monitoring System v2.0`, width / 2, height - 30);

        const output = path.join(tempDir, 'vps-status.png');
        
        await canvas.saveAs(output);
        
        await waitForFile(output, 5000);

        try {
            await conn.sendMessage(m.chat, {
                image: { url: output },
                caption: `*『 Server Status 』*`
            }, { quoted: m });
        } finally {
            setTimeout(() => {
                if (fs.existsSync(output)) {
                    try {
                        fs.unlinkSync(output);
                    } catch (err) {
                        console.error('Error deleting file:', err);
                    }
                }
            }, 1000);
        }
    } catch (error) {
        console.error('Error in handler:', error);
        await m.reply(`Error generating status: ${error.message}`);
    }
};

handler.help = ['status', 'st'];
handler.tags = ['info'];
handler.command = /^(status|st)$/i;
handler.owner = true;

export default handler;