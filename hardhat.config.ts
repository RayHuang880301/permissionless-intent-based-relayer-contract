import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";
import "hardhat-contract-sizer";
import "hardhat-docgen";
import "hardhat-spdx-license-identifier";
import "hardhat-storage-layout";
import "hardhat-tracer";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "tsconfig-paths/register";
import "hardhat-deploy";
import { getString } from "./utils/helper";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      },
    ],
  },
  spdxLicenseIdentifier: {
    runOnCompile: false,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    strict: true,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 20,
    noColors: true,
  },
  networks: {
    goerli: {
      url: getString(process.env.GOERLI_RPC_URL),
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
      verify: {
        etherscan: {
          apiKey: getString(process.env.GOERLI_ETHERSCAN_API_KEY),
        },
      },
    },
    gnosis: {
      url: 'https://rpc.gnosischain.com',
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
      verify: {
        etherscan: {
          apiKey: getString(process.env.GNOSIS_SCAN_API_KEY),
          apiUrl: 'https://api.gnosisscan.io/api'
        },
      },
    },
    arbitrumGoerli: {
      url: getString(process.env.ARB_GOERLI_RPC_URL),
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
      verify: {
        etherscan: {
          apiKey: getString(process.env.ARB_SCAN_API_KEY),
          apiUrl: 'https://api-goerli.arbiscan.io/api',
        },
      },
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    },
    scroll: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    },
    polygon_zkevm: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    },
    linea_testnet: {
      url: `https://rpc.goerli.linea.build`,
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    },
    chiliz_spicy_testnet: {
      url: `https://spicy-rpc.chiliz.com`,
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    },
    base: {
      url: getString(process.env.BASE_GOERLI_RPC_URL),
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    },
    mantle: {
      url: `https://rpc.testnet.mantle.xyz`,
      accounts: [getString(process.env.GOERLI_DEPLOYER_PRIVATE_KEY)],
    }
  },
  etherscan: {
    apiKey: {
      goerli: getString(process.env.GOERLI_ETHERSCAN_API_KEY),
      arbitrumGoerli: getString(process.env.ARB_SCAN_API_KEY),
      linea_testnet: getString(process.env.LINEA_API_KEY),
      base: getString(process.env.BASE_SCAN_API_KEY),
      gnosis: getString(process.env.GNOSIS_SCAN_API_KEY),
      mantle: getString(process.env.GOERLI_ETHERSCAN_API_KEY),
      polygon_zkevm: getString(process.env.POLYGON_ZKEVM_SCAN_API_KEY),
      scroll: getString(process.env.SCROLL_SCAN_API_KEY),
      mumbai: getString(process.env.POLYGON_SCAN_API_KEY),
    },
    customChains: [
      {
        network: "linea_testnet",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build/address"
        }
      },
      {
        network: "base",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/address",
        },
      },
      {
        network: "mantle",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz",
        },
      },
      {
        network: 'polygon_zkevm',
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "",
        }
      },
      {
        network: 'scroll',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: "",
        }
      },
      {
        network: 'mumbai',
        chainId: 80001,
        urls: {
          apiURL: 'https://api-testnet.polygonscan.com/api',
          browserURL: ""
        }
      }
    ]
  },
  // hardhat-deploy
  namedAccounts: {
    deployer: 0,
  },
};

export default config;
