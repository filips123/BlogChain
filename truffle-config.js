module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    // Ganache <http://truffleframework.com/ganache>
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};