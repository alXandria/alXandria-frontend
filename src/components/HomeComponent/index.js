import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Divider, Pagination, Spin, Tag } from 'antd'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const HomeComponent = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(10)
  const pageSize = 10

  const convertTime = (alxTimeTime) => {
    if (alxTimeTime) {
      const splitTime = alxTimeTime.split('.')
      const timestamp = splitTime[0]

      const date = new Date(Number(timestamp) * 1000)
      return `${date.toLocaleDateString('en-US')}`
    }
    return ''
  }

  // const searchArticles = (value) => {
  //   const searchValue = value.target.value
  //   setCurrentPage(1)
  //   setMinIndex(0)
  //   setMaxIndex(10)
  //   setSearch(searchValue)
  //   if (searchValue.length > 0) {
  //     const filtetedPost = posts.filter((element) => {
  //       return (
  //         element.post_title.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         element.text.toLowerCase().includes(searchValue.toLowerCase())
  //       )
  //     })
  //     setFilteredPosts(filtetedPost)
  //     setTotalCount(filteredPosts.length)
  //   } else {
  //     setTotalCount(posts.length)
  //     setFilteredPosts(posts)
  //   }
  // }

  const handleChange = (page) => {
    setCurrentPage(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize)
  }

  return (
    <Spin spinning={posts.loading}>
      <div className={`${style.background}`}>
        <div className="container-full mt-5 text-center">
          <h1 style={{ fontSize: '62px' }}>alXandria</h1>
          <Divider />
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              {posts.all?.map(
                (post, index1) =>
                  index1 >= minIndex &&
                  index1 < maxIndex && (
                    <Link to={`post/${post.post_id}`} key={index1}>
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
                              <Tag key={index + index1}>{tag}</Tag>
                            ))}
                          </div>
                        )}
                        <Divider />
                      </div>
                    </Link>
                  ),
              )}

              <Pagination
                pageSize={10}
                current={currentPage}
                total={posts.totalCount}
                onChange={handleChange}
                style={{ bottom: '0px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

const mapStateToProps = ({ user, chain, dispatch, posts }) => ({
  dispatch,
  user,
  chain,
  posts,
})
export default connect(mapStateToProps)(HomeComponent)
