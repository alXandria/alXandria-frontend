import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { SearchOutlined } from '@ant-design/icons'
import { forEach } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import style from './style.module.scss'

let searchInput = null

const Search = ({ intl: { formatMessage }, posts }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const showLiveSearch = () => {
    setShowSearch(true)
    setTimeout(() => {
      searchInput.focus()
    }, 100)
  }

  const searchTags = (tags, searchValue) => {
    let flag = false
    forEach(tags, (value) => {
      if (value.toLowerCase().includes(searchValue.toLowerCase())) {
        flag = true
      }
    })
    return flag
  }

  const changeSearchText = (e) => {
    setSearchText(e.target.value)
    const searchValue = e.target.value
    if (searchValue.length > 2) {
      const filtetedPost = posts.all.filter((element) => {
        return (
          element.post_title.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.text.toLowerCase().includes(searchValue.toLowerCase()) ||
          searchTags(element.tags, searchValue)
        )
      })
      console.log(filteredPosts)
      setFilteredPosts(filtetedPost)
    } else {
      setFilteredPosts([])
    }
  }

  const hideLiveSearch = () => {
    setFilteredPosts([])
    searchInput.blur()
    setShowSearch('')
    setSearchText('')
  }

  const handleKeyDown = (event) => {
    if (showSearch) {
      const key = event.keyCode.toString()
      if (key === '27') {
        hideLiveSearch()
      }
    }
  }

  const handleNode = (node) => {
    searchInput = node
  }

  return (
    <div className="d-inline-block col-12">
      <Input
        className={style.extInput}
        size="large"
        placeholder={formatMessage({ id: 'topBar.typeToSearch' })}
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        onFocus={showLiveSearch}
      />
      <div
        className={`${
          showSearch ? `${style.livesearch} ${style.livesearchVisible}` : style.livesearch
        }`}
        id="livesearch"
      >
        <button className={style.close} type="button" onClick={hideLiveSearch}>
          <i className="icmn-cross" />
        </button>
        <div className="container-fluid">
          <div className={style.wrapper}>
            <input
              type="search"
              className={style.searchInput}
              value={searchText}
              onChange={changeSearchText}
              id="livesearchInput"
              placeholder={formatMessage({ id: 'topBar.typeToSearch' })}
              ref={handleNode}
            />
            <ul className={style.options}>
              <li className={style.option}>Search all articles</li>
              {/* <li className={style.option}>Press enter to search</li> */}
            </ul>
            {!filteredPosts.length && (
              <div className={style.results}>
                <div className={style.resultsTitle}>
                  <span>No Results Found</span>
                </div>
              </div>
            )}
            {filteredPosts.length > 0 && (
              <div className={style.results}>
                <div className={style.resultsTitle}>
                  <span>Pages Search Results</span>
                </div>
                <div className="row">
                  {filteredPosts.map((post, index) => {
                    return (
                      <div className="col-lg-4 mt-4" key={index}>
                        <Link to={`/post/${post.post_id}`} onClick={hideLiveSearch}>
                          <div
                            className={style.resultThumb}
                            style={{
                              backgroundImage: 'url(resources/images/content/photos/1.jpeg)',
                            }}
                          >
                            {post.post_title.substring(0, 2).toUpperCase()}
                          </div>
                          <div className={style.result}>
                            <div className={style.resultText}>{post.post_title}</div>
                            <div className={style.resultSource}>
                              {`${post.text.substring(0, 30)}...`}
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ posts }) => ({
  posts,
})

export default connect(mapStateToProps)(injectIntl(Search))
