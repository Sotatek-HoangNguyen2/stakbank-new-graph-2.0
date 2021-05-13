# stakbank-new-graph-2.0

## I Introduction 
  TheGraph code is aimed to create a Crawler that is schedule to crawl the data on blockchain then store it into a Database.
  
## II Components
#### - graph-node
 -  Build runtime environmen to get data from the blockchain
 -  Deploy sub-grahp
#### - subgraph
 -  To define the list of data that the Crawler will retrieve from the blockchain
 ######  Step to declare sub-graph
  
  - Define Entities that are equivalent to output of the functions on smart contract afterward these entities can be queried from schema.graphql file.

  *Ex:*
  ```
    type StakeEntity @entity {
      id: ID!
      timestamp: BigInt
      stakingFunds: BigInt
    }
  ```
  - Defines hanlder to catch the queried data from Ethereum network then store them into database.

  *Ex:*
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
  
 ## III To run project
  #### - Start graph-node
    clone project
    cd graph-node/docker
    docker-compose up -d
  
  #### - Deploy subgraph
    cd sub-graph
    yarn create-local
    yarn deploy-local
    
