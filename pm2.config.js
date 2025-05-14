module.exports = {
  apps: [{
    name: 'page-to-pdf',
    script: './src/server.js',
    watch: [
      'src/**/*.js',
      'src/**/*.json',
      'src/**/*.ts',
      'src/**/*.tsx'
    ],
    watch_options: {
      followSymlinks: false,
      usePolling: true
    },
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: 'pm2_logs/error.log',
    out_file: 'pm2_logs/out.log',
    merge_logs: true,
    log_type: 'json',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    max_restarts: 10,
    restart_delay: 4000,
  }]
}; 