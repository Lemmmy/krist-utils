module "krist-utils" {
  export type PrivateKey = string;
  export type Address = string;

  export function sha256(input: string): string;
  export function hexToBase36(input: string): string;
  
  export function makeV2Address(key: PrivateKey, customPrefix?: string): Address;
  export function makeKristWalletPrivatekey(key: string, doublekey?: string): PrivateKey;
  export function makeKristWalletAddress(key: string, doublekey?: string, customPrefix?: string): Address;

  export function isValidKristAddress(address: string, customPrefix?: string): boolean;
  export function isValidName(name: string): boolean;
  export function isValidARecord(aRecord: string): boolean;

  export function parseCommonMeta(metadata: string): {
    [x: string]: string; 
    metaname: string?;
    name: string?;
    recipient: string?;
  };
}