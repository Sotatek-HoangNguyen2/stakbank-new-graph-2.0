import { BigInt } from "@graphprotocol/graph-ts";
import { StakingBegins, Withdraw } from "../generated/StakBank/StakBank";
import { StakeEntity, WithdrawEntity } from "../generated/schema";

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

export function handleWithdraw(event: Withdraw): void {
  let id = event.transaction.hash.toHexString();
  let temp = WithdrawEntity.load(id);
  if (temp === null) {
    temp = new WithdrawEntity(id);
  }
  temp.pool = event.params.pool;
  temp.userAddress = event.params.userAddress;
  temp.principal = event.params.principal;
  temp.yieldNumber = event.params.yieldNumber;
  temp.userFundsRemaining = event.params.userFundsRemaining;
  temp.stakingFundsRemaining = event.params.stakingFundsRemaining;

  temp.save();
}
