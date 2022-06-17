/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface RandomlyAssignedInterface extends ethers.utils.Interface {
  functions: {
    "availableTokenCount()": FunctionFragment;
    "maxAvailableSupply()": FunctionFragment;
    "tokenCount()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "availableTokenCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxAvailableSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "availableTokenCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxAvailableSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenCount", data: BytesLike): Result;

  events: {};
}

export class RandomlyAssigned extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RandomlyAssignedInterface;

  functions: {
    availableTokenCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxAvailableSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    tokenCount(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  availableTokenCount(overrides?: CallOverrides): Promise<BigNumber>;

  maxAvailableSupply(overrides?: CallOverrides): Promise<BigNumber>;

  tokenCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    availableTokenCount(overrides?: CallOverrides): Promise<BigNumber>;

    maxAvailableSupply(overrides?: CallOverrides): Promise<BigNumber>;

    tokenCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    availableTokenCount(overrides?: CallOverrides): Promise<BigNumber>;

    maxAvailableSupply(overrides?: CallOverrides): Promise<BigNumber>;

    tokenCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    availableTokenCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxAvailableSupply(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}