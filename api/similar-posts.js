// API service for handling similar posts data

/**
 * Fetch list of similar posts with optional filtering
 * @param {Object} params - Query parameters for filtering
 * @returns {Promise} - Promise with posts data
 */
export async function fetchSimilarPosts(params = {}) {
  try {
    // This will be replaced with actual API call when backend is ready
    // For now, using mock data with simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              title: '寻找北京市-市辖区-西城区 机械公司同事',
              location: '北京市-市辖区-西城区',
              author: '张三',
              isVerified: true,
              publishTime: '2024-05-21 14:30:25'
            },
            {
              id: 2,
              title: '同是南京大学毕业，求认识',
              location: '江苏省-南京市-鼓楼区',
              author: '李四',
              isVerified: false,
              publishTime: '2024-05-20 09:15:42'
            },
            {
              id: 3,
              title: '找北京老乡',
              location: '北京市-市辖区-朝阳区',
              author: '王五',
              isVerified: true,
              publishTime: '2024-05-19 16:25:11'
            },
            {
              id: 4,
              title: '同济大学校友会',
              location: '上海市-市辖区-杨浦区',
              author: '赵六',
              isVerified: true,
              publishTime: '2024-05-18 11:20:05'
            },
            {
              id: 5,
              title: '寻找老同学',
              location: '山东省-济南市-历下区',
              author: '孙七',
              isVerified: false,
              publishTime: '2024-05-17 08:45:30'
            }
          ],
          total: 5,
          page: params.page || 1,
          pageSize: params.pageSize || 10
        });
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching similar posts:', error);
    throw error;
  }
}

/**
 * Fetch a specific similar post by ID
 * @param {string|number} id - Post ID
 * @returns {Promise} - Promise with post data
 */
export async function fetchSimilarPostById(id) {
  try {
    // This will be replaced with actual API call when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: id,
          title: '北京市-市辖区-西城区 机械-公路机械-工路机',
          residenceAddress: '朝阳',
          gender: '女',
          education: '本科',
          occupation: '程序员',
          workPlace: '朝阳区',
          position: '工程师',
          hobby: '音乐',
          postalCode: '100000',
          hometown: '北京市-市辖区-西城区',
          userType: '个人',
          contactNumber: '0',
          fellowCount: '0',
          introduction: '这是一个寻找北京市西城区机械行业同事的帖子。希望能够找到曾经一起共事的老同事们，一起回忆过去的美好时光，分享各自的发展和经历。如果你曾在西城区的机械公司工作过，特别是公路机械或者工路机相关领域，欢迎联系我！'
        });
      }, 300);
    });
  } catch (error) {
    console.error(`Error fetching similar post with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch recommended similar posts
 * @param {number} limit - Number of recommendations to fetch
 * @returns {Promise} - Promise with recommended posts data
 */
export async function fetchRecommendedPosts(limit = 4) {
  try {
    // This will be replaced with actual API call when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 101,
            title: '同是北京城',
            summary: '相约北京城 中都汇共同缘主城',
            image: '/placeholder-image.jpg'
          },
          {
            id: 102,
            title: '盐湖水稻',
            summary: '盐湖市地处盐湖地区，有特色稻米...',
            image: '/placeholder-image.jpg'
          },
          {
            id: 103,
            title: '天达贸易',
            summary: '本公司成立20年来，覆盖全球30种稀贵资源...',
            image: '/placeholder-image.jpg'
          },
          {
            id: 104,
            title: '天山幼儿园',
            summary: '天山幼儿园成立于2021年，第一所正规...',
            image: '/placeholder-image.jpg'
          }
        ].slice(0, limit));
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching recommended posts:', error);
    throw error;
  }
}
