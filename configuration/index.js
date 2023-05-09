module.exports = {
    MONGODB_CONN_STR: "mongodb+srv://mitrasocietycorp:qySFrF54Mu40J7z7@cluster0.yg04ycc.mongodb.net/mitra",
    JWT_SECRET: "pradeepreddychada",
    oauth: {
      google: {
        clientID: "338601550454-1u2bn4i06l30sn0brqgshlqu3jnn7f2h.apps.googleusercontent.com",
        clientSecret: "n3HF4pWz42Q6qP9p6DksNxCO",
      },
      facebook: {
        clientID: "2273900542721665",
        clientSecret: "13c6f5d78a2c8c683c1e26d30e9f5583",
      },
    },
    EMAIL_CONFIG: {
      host: "smtpout.secureserver.net",
      secure: true,
      secureConnection: false, // TLS requires secureConnection to be false
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: "info@honeybag.in",
        pass: "HoneyBag@2020",
      },
    },
  };
  