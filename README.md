# SAMPLE 

# Getting Started: 

Install Dependencies for FE
`npm i `

Run FE script using: 
`webpack`

Setup Ngnix
If not installed : `sudo apt install nginx`

Configure ngnix: `vim /etc/nginx/sites-enabled/default`

Paste the following code: 

server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root [Investwellfront-path];
        index index.html index.htm index.nginx-debian.html;

        server_name investwell;
       
        location / {
                try_files $uri $uri/ /index.html;
        }

        location /api/ {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }  
}



Edit hosts file : 
`sudo vim /etc/hosts`

Add the following line : 
`127.0.0.1 localhost  demo.iwell.com`

Now restart ngnix 
`sudo systemctl restart nginx`

Check status of ngnix 
`sudo systemctl status nginx`

