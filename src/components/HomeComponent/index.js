import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Input, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { history } from 'index'
import style from './style.module.scss'
import backgroundImage from '../../../public/resources/images/knowledge.svg'

const HomeComponent = ({ chain }) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const onConnect = async () => {
      if (chain.cosmWasmClient.queryClient.wasm.queryContractSmart) {
        const ContractAddress = process.env.REACT_APP_CONTRACT_ADDR
        // Query arguments
        const allPosts = {
          all_posts: {},
        }
        // Do query type 'smart'
        const queryResult = await chain.cosmWasmClient.queryClient.wasm.queryContractSmart(
          ContractAddress,
          allPosts,
        )
        setPosts(queryResult.posts)
        setFilteredPosts(queryResult.posts)
      }
    }
    onConnect()
  }, [chain.cosmWasmClient])

  const convertTime = (desmosTime) => {
    if (desmosTime) {
      const splitTime = desmosTime.split('.')
      const timestamp = splitTime[0]

      const date = new Date(Number(timestamp) * 1000)
      return `${date.toLocaleDateString('en-US')}`
    }
    return ''
  }

  const searchArticles = (value) => {
    const searchValue = value.target.value
    setSearch(searchValue)

    if (searchValue.length > 0) {
      const filtetedPost = posts.filter((element) => {
        return (
          element.post_title.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.text.toLowerCase().includes(searchValue.toLowerCase())
        )
      })

      setFilteredPosts(filtetedPost)
    } else {
      setFilteredPosts(posts)
    }
  }

  return (
    <div className={`${style.background}`}>
      <div style={{ backgroundColor: '#fbd6d6' }}>
        <div className="container">
          <div
            className="row mb-5"
            style={{
              minHeight: 300,
              backgroundImage: `url("${backgroundImage}")`,
              backgroundPosition: 'center right',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '35% auto',
              padding: '200px 0px',
            }}
          >
            <div className="col-md-6">
              <h6 style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>
                Find best Web3 articles in one place
              </h6>
              <h1 style={{ fontWeight: 'bold' }}>
                The <span style={{ color: '#F13800', fontWeight: '900' }}>Fireproof</span>{' '}
                Encyclopedia
              </h1>
              <Input
                style={{ marginTop: 20 }}
                size="large"
                placeholder="Search Articles.."
                value={search}
                onChange={(value) => searchArticles(value)}
              />
              <div style={{ marginTop: 20 }}>Popular searches: web3, blockchain</div>
              <Button type="primary" className="mt-4" onClick={() => history.push('/create-post')}>
                New Post
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5" style={{ padding: 'auto 50px' }}>
          <div className="col-12 ">
            <h2>
              <span style={{ borderBottom: '3px solid #832C21', color: '#832C21' }}>
                {search && 'Searched Articles'}
                {!search && 'Latest Articles'}
              </span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {filteredPosts.map((post) => {
              if (!post.deletion_date) {
                return (
                  <Link to={`post/${post.post_id}`} key={post.post_id}>
                    <div className="row">
                      <div className="col-12">
                        <div className="row mb-3">
                          <div className="col-6">
                            <h4>{post.post_title}</h4>
                            {/* <span className={style.subspan}>By {post.author}</span> */}
                          </div>
                          <div className="col-12">{post.text}</div>
                          <div className="col-md-12">
                            {convertTime(
                              post.last_edit_date ? post.last_edit_date : post.creation_date,
                            )}
                          </div>
                        </div>
                      </div>
                      {post && post.tags && post.tags.length > 0 && (
                        <div className="col-md-12">
                          {post.tags.map((tag, index) => (
                            <Tag key={index}>
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      )}
                      <Divider />
                    </div>
                  </Link>
                )
              }
              return ''
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, chain, dispatch }) => ({
  dispatch,
  user,
  chain,
})
export default connect(mapStateToProps)(HomeComponent)
