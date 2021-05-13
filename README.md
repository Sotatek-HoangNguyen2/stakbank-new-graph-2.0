# stakbank-new-graph-2.0

## I Mô tả 
  Project với mục đích tạo ra một worker để tự động clone dữ liệu trên blocktrain về và lưu vào trong Database.
  
## II Thành phần
#### - graph-node
 -  Tạo ra môi trường runtime để lấy dữ liệu từ blockchains
 -  deploy subgraph thực hiện các nhiệm vụ cần thiết
#### - subgraph
 -  Dùng để khai báo các data từ Ethereum và lưu chúng vào database
 ######   *Các bước khai báo subgraph* 
  
  - Định nghĩa các Entity của các hàm trên smart contract cần query dữ liệu trong file schema.graphql

  *VD:*
  ```
    type StakeEntity @entity {
      id: ID!
      timestamp: BigInt
      stakingFunds: BigInt
    }
  ```
  - Viết các hàm bắt sự kiện query từ Ethereum về, và lưu dữ liệu vào trong database

  *VD:*
  ```
  export function handleStakingBegins(event: StakingBegins): void {
    let id = event.transaction.hash.toHexString();
    let stake = StakeEntity.load(id);
    if (stake === null) {
      stake = new StakeEntity(id);
    }
    stake.timestamp = event.params.timestamp;
    stake.stakingFunds = event.params.stakingFunds;

    stake.save();
  }
  ```
  
 ## III Run project
  #### - Start graph-node
    clone project
    cd graph-node/docker
    docker-compose up -d
  
  #### - Deploy subgraph
    cd sub-graph
    yarn create-local
    yarn deploy-local
    
