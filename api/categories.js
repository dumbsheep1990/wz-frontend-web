// API service for handling category data

/**
 * Fetch list of similar categories
 * @returns {Promise} - Promise with categories data
 */
export async function fetchSimilarCategories() {
  try {
    // This will be replaced with actual API call when backend is ready
    // For now, using mock data with simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { code: "同用", name: "同用" },
            { code: "同好", name: "同好" },
            { code: "同购", name: "同购" },
            { code: "同年", name: "同年" },
            { code: "同游", name: "同游" },
            { code: "同在", name: "同在" },
            { code: "同市", name: "同市" },
            { code: "同企", name: "同企" },
            { code: "同亲", name: "同亲" },
            { code: "同班", name: "同班" },
            { code: "同师", name: "同师" },
            { code: "同业", name: "同业" },
            { code: "同网", name: "同网" },
            { code: "同工", name: "同工" },
            { code: "同务", name: "同务" },
            { code: "同艺", name: "同艺" },
            { code: "同玩", name: "同玩" },
            { code: "同闲", name: "同闲" },
            { code: "同拍", name: "同拍" },
            { code: "同乡", name: "同乡" },
            { code: "同学", name: "同学" }
          ]
        });
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching similar categories:', error);
    throw error;
  }
}
