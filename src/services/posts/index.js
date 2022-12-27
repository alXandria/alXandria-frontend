import { setupWasmExtension } from '@cosmjs/cosmwasm-stargate'
import { QueryClient } from '@cosmjs/stargate'
import { HttpBatchClient, Tendermint34Client } from '@cosmjs/tendermint-rpc'
import ChainInfo from 'utils/chainInfo'

export default function getAllPosts() {
  const httpBatch = new HttpBatchClient(ChainInfo.rpc)
  let currentPage = 1
  return Tendermint34Client.create(httpBatch).then(async (tmClient) => {
    const queryClient = QueryClient.withExtensions(tmClient, setupWasmExtension)
    if (queryClient.wasm.queryContractSmart) {
      const ContractAddress = process.env.REACT_APP_CONTRACT_ADDR
      // Query arguments
      const allPosts = {
        all_posts: {},
      }
      const queryResult = await queryClient.wasm.queryContractSmart(ContractAddress, allPosts)
      const count = { article_count: {} }
      const countResult = await queryClient.wasm.queryContractSmart(ContractAddress, count)
      let allPostsResponse = []
      allPostsResponse = [...queryResult.posts]

      for (let i = 0; i < countResult.article_count % 10; i += 1) {
        const pagePosts = {
          all_posts: {
            start_after: currentPage * 10,
          },
        }
        // Do query type 'smart'
        const paginationQueryResult = await queryClient.wasm.queryContractSmart(
          ContractAddress,
          pagePosts,
        )

        allPostsResponse.push(...paginationQueryResult.posts)
        currentPage += 1
      }

      return {
        totalCount: countResult.article_count,
        allPosts: allPostsResponse,
      }
    }
    return {
      totalCount: 0,
      allPosts: [],
    }
  })
}
