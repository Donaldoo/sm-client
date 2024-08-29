const getToken = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token')
    if (data !== null) {
      return data
    }
  }
}

class HttpClient {
  private apiEndpoint: string | undefined

  constructor(apiEndpoint?: string) {
    this.apiEndpoint = apiEndpoint ?? process.env.NEXT_PUBLIC_API_URL
  }

  private getInstance() {
    return {
      baseURL: this.apiEndpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      }
    }
  }

  get(url: string, params?: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.getInstance().baseURL}/${url}`, {
        method: 'GET',
        headers: this.getInstance().headers,
        body: JSON.stringify(params)
      })
        .then(response => {
          resolve(response.json())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  post(url: string, params?: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.getInstance().baseURL}/${url}`, {
        method: 'POST',
        headers: this.getInstance().headers,
        body: JSON.stringify(params)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => reject(error[0]))
          }
          return response.json().then(data => resolve(data))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  put(url: string, params?: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.getInstance().baseURL}/${url}`, {
        method: 'PUT',
        headers: this.getInstance().headers,
        body: JSON.stringify(params)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => reject(error[0]))
          }
          return response.json().then(data => resolve(data))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  delete(url: string, params?: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.getInstance().baseURL}/${url}`, {
        method: 'DELETE',
        headers: this.getInstance().headers,
        body: JSON.stringify(params)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => reject(error[0]))
          }
          return response.json().then(data => resolve(data))
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default HttpClient
const httpClient = new HttpClient()
export { httpClient }
