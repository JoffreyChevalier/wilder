import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createWilder: Wilder;
  deleteWilder: Scalars['Boolean'];
  updateWilder: Wilder;
};


export type MutationCreateWilderArgs = {
  data: WilderInput;
};


export type MutationDeleteWilderArgs = {
  id: Scalars['String'];
};


export type MutationUpdateWilderArgs = {
  data: WilderInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  wilders: Array<Wilder>;
};

export type SkillId = {
  id: Scalars['Float'];
};

export type SkillOfWilder = {
  __typename?: 'SkillOfWilder';
  id: Scalars['Float'];
  name: Scalars['String'];
  votes: Scalars['Float'];
};

export type Wilder = {
  __typename?: 'Wilder';
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  skills: Array<SkillOfWilder>;
};

export type WilderInput = {
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  skills?: InputMaybe<Array<SkillId>>;
};

export type WildersQueryVariables = Exact<{ [key: string]: never; }>;


export type WildersQuery = { __typename?: 'Query', wilders: Array<{ __typename?: 'Wilder', id: number, name: string, city?: string | null, bio?: string | null, skills: Array<{ __typename?: 'SkillOfWilder', id: number, name: string, votes: number }> }> };


export const WildersDocument = gql`
    query Wilders {
  wilders {
    id
    name
    city
    bio
    skills {
      id
      name
      votes
    }
  }
}
    `;

/**
 * __useWildersQuery__
 *
 * To run a query within a React component, call `useWildersQuery` and pass it any options that fit your needs.
 * When your component renders, `useWildersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWildersQuery({
 *   variables: {
 *   },
 * });
 */
export function useWildersQuery(baseOptions?: Apollo.QueryHookOptions<WildersQuery, WildersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WildersQuery, WildersQueryVariables>(WildersDocument, options);
      }
export function useWildersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WildersQuery, WildersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WildersQuery, WildersQueryVariables>(WildersDocument, options);
        }
export type WildersQueryHookResult = ReturnType<typeof useWildersQuery>;
export type WildersLazyQueryHookResult = ReturnType<typeof useWildersLazyQuery>;
export type WildersQueryResult = Apollo.QueryResult<WildersQuery, WildersQueryVariables>;