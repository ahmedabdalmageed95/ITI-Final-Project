import { Owners } from "./Owners";
import { SubPlayground } from "./SubPlayground";

export class Playground {
  public PlaygroundID: number;
  public Name: string;
  public Country: string;
  public City: string;
  public Street: string;
  public Phone1: string;
  public Phone2: string;
  public Rate: number;
  public Image: number[];
  public OwnerID: number;
  public Owner: Owners;
  public SubPlaygrounds: SubPlayground[];
}
