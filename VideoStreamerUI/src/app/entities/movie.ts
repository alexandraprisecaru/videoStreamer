// Analogous Javqa class in the backend:
// https://github.com/VictorGil/transfers_api/blob/master/src/main/java/net/devaction/entity/AccountBalanceEntity.java

export class Movie {

  readonly Id: string;
  readonly Title: string;

  // this is the latest transfer recorded
  // for this account and balance
  readonly Synopsis: string;
}
