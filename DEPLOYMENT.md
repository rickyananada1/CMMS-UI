# CMMS-UI Deployment Guide

This guide explains how to set up automatic deployment of the CMMS-UI application to a VPS.

## Prerequisites

1. A VPS running Ubuntu 20.04/22.04
2. Domain name pointing to your VPS (optional but recommended)
3. GitHub repository for your project

## VPS Setup

1. **Connect to your VPS** via SSH:
   ```bash
   ssh username@your_vps_ip
   ```

2. **Run the setup script**:
   ```bash
   bash <(curl -s https://raw.githubusercontent.com/yourusername/CMMS-UI/main/deploy/setup-vps.sh)
   ```
   
   Or manually copy the script to your VPS and run it.

3. **Configure environment variables** in `/var/www/cmms-ui/.env`:
   ```
   NODE_ENV=production
   PORT=8000
   # Add other environment variables as needed
   ```

## GitHub Repository Setup

1. **Add repository secrets** in GitHub (Settings > Secrets > Actions > New repository secret):
   - `VPS_HOST`: Your VPS IP address or domain
   - `VPS_USERNAME`: SSH username for your VPS
   - `VPS_SSH_KEY`: Private SSH key with access to the VPS
   - `VPS_SSH_PORT`: SSH port (default: 22)

2. **Update the repository URL** in the GitHub Actions workflow file (`.github/workflows/deploy.yml`) if needed.

## Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions will automatically:
   - Build the React application
   - Deploy to your VPS
   - Restart the application using PM2

## Manual Commands (if needed)

- **Start the application**: `pm2 start ecosystem.config.js`
- **Stop the application**: `pm2 stop cmms-ui`
- **View logs**: `pm2 logs cmms-ui`
- **Restart application**: `pm2 restart cmms-ui`

## Nginx Configuration

The setup script configures Nginx as a reverse proxy. You may need to update the domain in `/etc/nginx/sites-available/cmms-ui`.

## Security

- The setup script enables UFW firewall and allows only necessary ports (80, 443, 22)
- Consider setting up SSL using Let's Encrypt for production use
- Keep your VPS and dependencies updated

## Troubleshooting

- Check PM2 logs: `pm2 logs cmms-ui`
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Check Nginx access logs: `sudo tail -f /var/log/nginx/access.log`
- Verify the application is running: `pm2 status`
