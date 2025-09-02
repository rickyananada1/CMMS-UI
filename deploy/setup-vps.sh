#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx nodejs npm git

# Install PM2 globally
sudo npm install -g pm2

# Create deployment directory
sudo mkdir -p /var/www/cmms-ui
sudo chown -R $USER:$USER /var/www/cmms-ui

# Clone repository (replace with your repo URL)
git clone https://github.com/yourusername/CMMS-UI.git /var/www/cmms-ui

# Install dependencies and generate package-lock.json
cd /var/www/cmms-ui
npm install --package-lock-only
npm ci --production

# Build the application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOL'
module.exports = {
  apps: [{
    name: 'cmms-ui',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 8000
    }
  }]
};
EOL

# Start the application
pm2 start ecosystem.config.js

# Configure PM2 to start on boot
pm2 startup
pm2 save

# Set up Nginx as reverse proxy
sudo bash -c 'cat > /etc/nginx/sites-available/cmms-ui << EOL
server {
    listen 80;
    server_name your_domain.com;  # Replace with your domain or IP

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL'

# Enable the site
sudo ln -s /etc/nginx/sites-available/cmms-ui /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install and configure firewall
sudo apt install -y ufw
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw enable
