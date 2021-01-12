const Hash = require('ipfs-only-hash')
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
class App extends React.Component {
 
  constructor(props) {
     super(props);
     this.state = {
       buffer:null,
       a1:hash3,
       //memeHash:'QmNei5ub74g2N6avDZyqwNBHxC5hsm5DAUbZRuHiHHvwRZ',
      // count:0,
       //list:'',
       //url:'https://api.qrserver.com/v1/create-qr-code/?data=https://ipfs.infura.io/ipfs/',
      // url2:'&amp',
       
      };
    }
async function rohanCall() {
    const data = Buffer.from(' hello world')
    const hash = await Hash.of(data)
    console.log(hash);
    // expected output: "resolved"
  }
  
  rohanCall();
  


  