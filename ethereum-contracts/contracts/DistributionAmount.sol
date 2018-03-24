pragma solidity ^0.4.17;

contract DistributionAsset {
    
    /*
        PUB_KEY OF PRODUCTION COMPANY (e.g. Warner Brothers)
    */
    address public productionCompany;

    /*
         List of distributors
    */
    mapping(address => bool) public  distributors;
    /*
    
    /*  
        Views for Distributor
    */
    mapping(address => uint256) public views;
    /*
        service token - time 
    */
    mapping(uint256 => uint256) public tokensTime;

     /*
        service token - distributor 
    */
    mapping(uint256 => address) public tokensDistributor;
    

    /*
        modifiers
    */
    modifier onlyProductionCompany(){
        require(msg.sender == productionCompany);
        _;
    }
    modifier onlyDistributor(){
        require(distributors[msg.sender]);
        _;
    }

    
    function DistributionAsset() public {
        productionCompany = msg.sender;
    }

    /*
      add distributor to asset (e.g. Megogo)
    */
    function addDistributor(address distributor)  public onlyProductionCompany {
        distributors[distributor] = true;
    }
    function addProofOfView(address distributor, uint256 token) public onlyProductionCompany {
        views[distributor]++;
        tokensTime[token] = now;
        tokensDistributor[token] = distributor;
    }

}