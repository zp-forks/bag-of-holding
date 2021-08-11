import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};





export type AddItemInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type AddItemResult = Campaign | CampaignNotFound;

export type AddTagResult = Campaign | CampaignNotFound | ItemNotFound;

export type Campaign = {
  __typename: 'Campaign';
  id: Scalars['ID'];
  name: Scalars['String'];
  electrum: Scalars['Int'];
  platinum: Scalars['Int'];
  gold: Scalars['Int'];
  silver: Scalars['Int'];
  copper: Scalars['Int'];
  items: Array<Item>;
  createdAt: Scalars['String'];
  config?: Maybe<CampaignConfig>;
};

export type CampaignConfig = {
  __typename: 'CampaignConfig';
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type CampaignNotFound = {
  __typename: 'CampaignNotFound';
  message: Scalars['String'];
};

export type CreatedCampaign = {
  __typename: 'CreatedCampaign';
  id: Scalars['ID'];
};

export type EditConfigResult = CampaignConfig | CampaignNotFound;

export type EditItemInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type EditItemResult = Campaign | CampaignNotFound | InvalidInput | ItemNotFound;

export type FetchCampaignResult = Campaign | CampaignNotFound;

export type InvalidInput = {
  __typename: 'InvalidInput';
  message: Scalars['String'];
};

export type Item = {
  __typename: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type ItemNotFound = {
  __typename: 'ItemNotFound';
  message: Scalars['String'];
};

export type ModifyMoneyInput = {
  modification: MoneyModification;
  electrum: Scalars['Int'];
  platinum: Scalars['Int'];
  gold: Scalars['Int'];
  silver: Scalars['Int'];
  copper: Scalars['Int'];
};

export type ModifyMoneyResult = Campaign | CampaignNotFound;

export type ModifyTagsInput = {
  itemId: Scalars['ID'];
  tag: Scalars['String'];
};

export enum MoneyModification {
  ADD = 'ADD',
  DEDUCT = 'DEDUCT'
}

export type Mutation = {
  __typename: 'Mutation';
  createCampaign: CreatedCampaign;
  addItem: AddItemResult;
  removeItem: RemoveItemResult;
  editItem: EditItemResult;
  modifyMoney: ModifyMoneyResult;
  addTag: AddTagResult;
  removeTag: RemoveTagResult;
  editConfig: EditConfigResult;
};


export type MutationCreateCampaignArgs = {
  name: Scalars['String'];
};


export type MutationAddItemArgs = {
  id: Scalars['ID'];
  input: AddItemInput;
};


export type MutationRemoveItemArgs = {
  id: Scalars['ID'];
  input: RemoveItemInput;
};


export type MutationEditItemArgs = {
  id: Scalars['ID'];
  input: EditItemInput;
};


export type MutationModifyMoneyArgs = {
  id: Scalars['ID'];
  input: ModifyMoneyInput;
};


export type MutationAddTagArgs = {
  id: Scalars['ID'];
  input: ModifyTagsInput;
};


export type MutationRemoveTagArgs = {
  id: Scalars['ID'];
  input: ModifyTagsInput;
};


export type MutationEditConfigArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename: 'Query';
  listCampaigns: Array<Maybe<Campaign>>;
  fetchCampaign: FetchCampaignResult;
};


export type QueryFetchCampaignArgs = {
  id: Scalars['ID'];
};

export type RemoveItemInput = {
  /** ID of the item to be removed */
  id: Scalars['ID'];
};

export type RemoveItemResult = Campaign | CampaignNotFound;

export type RemoveTagResult = Campaign | CampaignNotFound | ItemNotFound;


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddItemInput: AddItemInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AddItemResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  AddTagResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'] | ResolversTypes['ItemNotFound'];
  Campaign: ResolverTypeWrapper<Campaign>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CampaignConfig: ResolverTypeWrapper<CampaignConfig>;
  CampaignNotFound: ResolverTypeWrapper<CampaignNotFound>;
  CreatedCampaign: ResolverTypeWrapper<CreatedCampaign>;
  EditConfigResult: ResolversTypes['CampaignConfig'] | ResolversTypes['CampaignNotFound'];
  EditItemInput: EditItemInput;
  EditItemResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'] | ResolversTypes['InvalidInput'] | ResolversTypes['ItemNotFound'];
  FetchCampaignResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  InvalidInput: ResolverTypeWrapper<InvalidInput>;
  Item: ResolverTypeWrapper<Item>;
  ItemNotFound: ResolverTypeWrapper<ItemNotFound>;
  ModifyMoneyInput: ModifyMoneyInput;
  ModifyMoneyResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  ModifyTagsInput: ModifyTagsInput;
  MoneyModification: MoneyModification;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveItemInput: RemoveItemInput;
  RemoveItemResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  RemoveTagResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'] | ResolversTypes['ItemNotFound'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddItemInput: AddItemInput;
  String: Scalars['String'];
  Int: Scalars['Int'];
  AddItemResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  AddTagResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'] | ResolversParentTypes['ItemNotFound'];
  Campaign: Campaign;
  ID: Scalars['ID'];
  CampaignConfig: CampaignConfig;
  CampaignNotFound: CampaignNotFound;
  CreatedCampaign: CreatedCampaign;
  EditConfigResult: ResolversParentTypes['CampaignConfig'] | ResolversParentTypes['CampaignNotFound'];
  EditItemInput: EditItemInput;
  EditItemResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'] | ResolversParentTypes['InvalidInput'] | ResolversParentTypes['ItemNotFound'];
  FetchCampaignResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  InvalidInput: InvalidInput;
  Item: Item;
  ItemNotFound: ItemNotFound;
  ModifyMoneyInput: ModifyMoneyInput;
  ModifyMoneyResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  ModifyTagsInput: ModifyTagsInput;
  Mutation: {};
  Query: {};
  RemoveItemInput: RemoveItemInput;
  RemoveItemResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  RemoveTagResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'] | ResolversParentTypes['ItemNotFound'];
  Boolean: Scalars['Boolean'];
}>;

export type AddItemResultResolvers<ContextType = any, ParentType = ResolversParentTypes['AddItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type AddTagResultResolvers<ContextType = any, ParentType = ResolversParentTypes['AddTagResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type CampaignResolvers<ContextType = any, ParentType = ResolversParentTypes['Campaign']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  electrum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  platinum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  silver?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  copper?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['CampaignConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CampaignConfigResolvers<ContextType = any, ParentType = ResolversParentTypes['CampaignConfig']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CampaignNotFoundResolvers<ContextType = any, ParentType = ResolversParentTypes['CampaignNotFound']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatedCampaignResolvers<ContextType = any, ParentType = ResolversParentTypes['CreatedCampaign']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditConfigResultResolvers<ContextType = any, ParentType = ResolversParentTypes['EditConfigResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CampaignConfig' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type EditItemResultResolvers<ContextType = any, ParentType = ResolversParentTypes['EditItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound' | 'InvalidInput' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type FetchCampaignResultResolvers<ContextType = any, ParentType = ResolversParentTypes['FetchCampaignResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type InvalidInputResolvers<ContextType = any, ParentType = ResolversParentTypes['InvalidInput']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = any, ParentType = ResolversParentTypes['Item']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemNotFoundResolvers<ContextType = any, ParentType = ResolversParentTypes['ItemNotFound']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModifyMoneyResultResolvers<ContextType = any, ParentType = ResolversParentTypes['ModifyMoneyResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCampaign?: Resolver<ResolversTypes['CreatedCampaign'], ParentType, ContextType, RequireFields<MutationCreateCampaignArgs, 'name'>>;
  addItem?: Resolver<ResolversTypes['AddItemResult'], ParentType, ContextType, RequireFields<MutationAddItemArgs, 'id' | 'input'>>;
  removeItem?: Resolver<ResolversTypes['RemoveItemResult'], ParentType, ContextType, RequireFields<MutationRemoveItemArgs, 'id' | 'input'>>;
  editItem?: Resolver<ResolversTypes['EditItemResult'], ParentType, ContextType, RequireFields<MutationEditItemArgs, 'id' | 'input'>>;
  modifyMoney?: Resolver<ResolversTypes['ModifyMoneyResult'], ParentType, ContextType, RequireFields<MutationModifyMoneyArgs, 'id' | 'input'>>;
  addTag?: Resolver<ResolversTypes['AddTagResult'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'id' | 'input'>>;
  removeTag?: Resolver<ResolversTypes['RemoveTagResult'], ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'id' | 'input'>>;
  editConfig?: Resolver<ResolversTypes['EditConfigResult'], ParentType, ContextType, RequireFields<MutationEditConfigArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  listCampaigns?: Resolver<Array<Maybe<ResolversTypes['Campaign']>>, ParentType, ContextType>;
  fetchCampaign?: Resolver<ResolversTypes['FetchCampaignResult'], ParentType, ContextType, RequireFields<QueryFetchCampaignArgs, 'id'>>;
}>;

export type RemoveItemResultResolvers<ContextType = any, ParentType = ResolversParentTypes['RemoveItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type RemoveTagResultResolvers<ContextType = any, ParentType = ResolversParentTypes['RemoveTagResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AddItemResult?: AddItemResultResolvers<ContextType>;
  AddTagResult?: AddTagResultResolvers<ContextType>;
  Campaign?: CampaignResolvers<ContextType>;
  CampaignConfig?: CampaignConfigResolvers<ContextType>;
  CampaignNotFound?: CampaignNotFoundResolvers<ContextType>;
  CreatedCampaign?: CreatedCampaignResolvers<ContextType>;
  EditConfigResult?: EditConfigResultResolvers<ContextType>;
  EditItemResult?: EditItemResultResolvers<ContextType>;
  FetchCampaignResult?: FetchCampaignResultResolvers<ContextType>;
  InvalidInput?: InvalidInputResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemNotFound?: ItemNotFoundResolvers<ContextType>;
  ModifyMoneyResult?: ModifyMoneyResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveItemResult?: RemoveItemResultResolvers<ContextType>;
  RemoveTagResult?: RemoveTagResultResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
