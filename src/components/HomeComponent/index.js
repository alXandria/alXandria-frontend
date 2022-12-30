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
          <div className="row">
            <div className="col-md-12 text-center">
              <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 421 90"
                  style={{ enableBackground: 'new 0 0 421 90' }}
                >
                  <g
                    id="_x38_1305896-e4eb-4fb9-b1cf-4e6a2d51ad30"
                    transform="matrix(5.655042595806296,0,0,5.655042595806296,81.83958348909857,-0.22620120202757477)"
                  >
                    <path
                      style={{ fill: '#250A05' }}
                      d="M1,8.1l0.5,0.1l0.3-1.1C2.2,7,2.6,7,3,7c0.8,0,1.4,0.5,1.4,1.5v0.7c-1.8,0-4,0.3-4,2.3c0,1.2,0.9,1.8,2.1,1.8
		c1,0,1.3-0.2,1.9-0.6l0.2,0.5h1.9l0.1-0.5l-0.9-0.3V9c0-1.7-0.9-2.6-2.6-2.6C2.3,6.5,1.7,6.6,1,7V8.1z M4.4,11.9
		c-0.3,0.5-0.7,0.8-1.3,0.8s-1.2-0.3-1.2-1.3c0-1,0.7-1.6,2.5-1.6V11.9z M9.5,12.4V2.9L8.9,2.7L7.4,2.9l0.1,0.5h0.7v9l-0.9,0.3
		l0.1,0.5h2.9l0.1-0.5L9.5,12.4z M15.4,9.2l1.9,2.9L16,12.6l0.1,0.6h4l0.1-0.6L19,12.1l-2.7-4.2L19,4.4l1.2-0.5l-0.1-0.6h-3
		l-0.1,0.6l1.2,0.5L16,7.4l-1.9-2.9l1.2-0.5l-0.1-0.6h-4L11.1,4l1.2,0.5L15,8.6l-2.7,3.5l-1.2,0.5l0.1,0.6h3l0.1-0.6l-1.2-0.5
		L15.4,9.2z M21.4,8.1l0.5,0.1l0.3-1.1C22.6,7,23,7,23.4,7c0.8,0,1.4,0.5,1.4,1.5v0.7c-1.8,0-4,0.3-4,2.3c0,1.2,0.9,1.8,2.1,1.8
		c1,0,1.3-0.2,1.9-0.6l0.2,0.5h1.9l0.1-0.5l-0.9-0.3V9c0-1.7-0.9-2.6-2.6-2.6c-0.7,0-1.4,0.2-2.1,0.5V8.1z M24.8,11.9
		c-0.3,0.5-0.7,0.8-1.3,0.8c-0.6,0-1.2-0.3-1.2-1.3c0-1,0.7-1.6,2.5-1.6V11.9z M29.9,12.4V7.5c0.4-0.2,0.9-0.4,1.5-0.4
		c0.7,0,1.4,0.5,1.4,1.4v3.8l-0.9,0.3l0.1,0.5h2.9l0.1-0.5l-0.9-0.3V8.8c0-1.5-0.9-2.3-2.4-2.3c-0.7,0-1.2,0.2-1.8,0.5l-0.5-0.5
		l-1.6,0.2l0.1,0.5h0.7v5.2l-0.9,0.3l0.1,0.5h2.9l0.1-0.5L29.9,12.4z M40.7,12c-0.4,0.4-0.8,0.6-1.4,0.6c-1.2,0-1.9-1.2-1.9-2.9
		s0.6-2.7,2-2.7c0.5,0,1,0.2,1.3,0.4V12z M40.7,12.7l0.2,0.5h1.9l0.1-0.5L42,12.4V2.9l-0.6-0.2l-1.6,0.2l0.1,0.5h0.8v3.4
		c-0.5-0.2-1-0.3-1.4-0.3c-2.1,0-3.3,1.4-3.3,3.5c0,2.1,1.1,3.4,3.3,3.4C39.9,13.3,40.5,12.9,40.7,12.7z M48.8,8.1V6.7
		c-0.4-0.2-0.8-0.2-1.2-0.2c-0.7,0-1.3,0.2-1.7,0.5l-0.5-0.5l-1.6,0.2l0.1,0.5h0.7v5.2l-0.9,0.3l0.1,0.5h2.9l0.1-0.5l-0.9-0.3V7.5
		c0.5-0.2,1.1-0.4,1.5-0.4c0.3,0,0.5,0,0.7,0.1l0.3,1L48.8,8.1z M51.7,12.4V6.6l-0.6-0.2l-1.5,0.2l0.1,0.5h0.7v5.2l-0.9,0.3l0.1,0.5
		h2.9l0.1-0.5L51.7,12.4z M51,3.4c-0.4,0-0.8,0.3-0.8,0.8c0,0.4,0.3,0.7,0.8,0.7c0.4,0,0.8-0.3,0.8-0.7C51.8,3.7,51.4,3.4,51,3.4z
		 M54.2,8.1l0.5,0.1L55,7.1C55.4,7,55.8,7,56.2,7c0.8,0,1.4,0.5,1.4,1.5v0.7c-1.8,0-4,0.3-4,2.3c0,1.2,0.9,1.8,2.1,1.8
		c1,0,1.3-0.2,1.9-0.6l0.2,0.5h1.9l0.1-0.5l-0.9-0.3V9c0-1.7-0.9-2.6-2.6-2.6c-0.7,0-1.4,0.2-2.1,0.5V8.1z M57.6,11.9
		c-0.3,0.5-0.7,0.8-1.3,0.8c-0.6,0-1.2-0.3-1.2-1.3c0-1,0.7-1.6,2.5-1.6V11.9z"
                    />
                  </g>
                  <g
                    id="_x39_e55363f-d49c-472e-bd48-2e843c1d7f60"
                    transform="matrix(2.8125,0,0,2.8125,-12.426001459360123,0)"
                  >
                    <linearGradient
                      id="SVGID_1_"
                      gradientUnits="userSpaceOnUse"
                      x1="-26.4395"
                      y1="104.5985"
                      x2="-25.4395"
                      y2="104.5985"
                      gradientTransform="matrix(58.2495 38.0356 27.1622 -81.5677 -1299.8217 9547.585)"
                    >
                      <stop offset="0" style={{ stopColor: '#30223A' }} />
                      <stop offset="1" style={{ stopColor: '#F13800' }} />
                    </linearGradient>
                    <path
                      className="st1"
                      style={{ fill: 'url(#SVGID_1_)' }}
                      d="M27.4,11.4L16,0L4.6,11.4L16,22.8C16,22.8,27.4,11.4,27.4,11.4z M16,6l5.4,5.3L16,16.7l-5.4-5.4L16,6z
		 M27.4,15l-5.7,5.7V32h5.7V15z M10.2,20.6L4.6,15v17h5.7V20.6z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 text-center">
              alXandria is an online, open-source, collaborative encyclopedic effort. It allows
              anyone to create, edit, or delete articles. It is a smart-contract on the Juno
              blockchain. Borderless, permissionless, and self sovereign access to information and
              participatory governance.
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            {posts.all.length > 0 && (
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
                          <div className="col-md-12 mb-2">
                            <Tag color="volcano">Likes {post.likes}</Tag>
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
            )}
            {posts.all.length === 0 && (
              <div className="col-md-12 text-center">Please come back to check latest news!</div>
            )}
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
