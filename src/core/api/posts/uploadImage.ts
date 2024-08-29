export default async function uploadImage(image: File): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (!baseUrl) {
    throw new Error('Base URL is not defined')
  }

  const formData = new FormData()
  formData.append('image', image)

  try {
    const response = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData
    } as RequestInit)

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    return await response.text()
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
