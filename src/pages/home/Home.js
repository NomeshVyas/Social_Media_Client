import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../utils/axiosClient'

const Home = () => {
  const [showData, setShowData] = useState('')
  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const res = await axiosClient.get('/posts/all');
      console.log('got the response in fetchData', res);
      setShowData(res.data.status);
    } catch (err) {
      console.log("error in fetchData", err);
    }
  }
  return (
    <div>{showData}</div>
  )
}

export default Home;