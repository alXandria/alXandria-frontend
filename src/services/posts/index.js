import { setupWasmExtension } from '@cosmjs/cosmwasm-stargate'
import { QueryClient } from '@cosmjs/stargate'
import { HttpBatchClient, Tendermint34Client } from '@cosmjs/tendermint-rpc'
import ChainInfo from 'utils/chainInfo'

export default function getAllPosts() {
  const httpBatch = new HttpBatchClient(ChainInfo.rpc)
  return Tendermint34Client.create(httpBatch).then(async (tmClient) => {
    const queryClient = QueryClient.withExtensions(tmClient, setupWasmExtension)
    if (queryClient.wasm.queryContractSmart) {
      const ContractAddress = process.env.REACT_APP_CONTRACT_ADDR
      const count = { article_count: {} }
      const countResult = await queryClient.wasm.queryContractSmart(ContractAddress, count)
      const allPostsResponse = []

      for (let i = 0; i < Math.floor(countResult.article_count / 10) + 1; i += 1) {
        const startAfter = countResult.article_count + 1 - i * 10
        const pagePosts = {
          all_posts: {
            start_after: startAfter,
          },
        }
        // Do query type 'smart'
        const paginationQueryResult = await queryClient.wasm.queryContractSmart(
          ContractAddress,
          pagePosts,
        )

        allPostsResponse.push(...paginationQueryResult.posts)
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
