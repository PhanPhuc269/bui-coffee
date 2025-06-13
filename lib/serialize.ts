// Helper function to serialize MongoDB documents
export function serializeDocument(doc: any) {
  if (!doc) return null

  // Create a new object to avoid modifying the original
  const serialized = { ...doc }

  // Convert _id from ObjectId to string
  if (serialized._id) {
    serialized._id = serialized._id.toString()
  }

  // Handle nested documents in arrays
  Object.keys(serialized).forEach((key) => {
    if (Array.isArray(serialized[key])) {
      serialized[key] = serialized[key].map((item: any) => {
        if (item && typeof item === "object" && item._id) {
          return serializeDocument(item)
        }
        return item
      })
    } else if (serialized[key] && typeof serialized[key] === "object" && serialized[key]._id) {
      serialized[key] = serializeDocument(serialized[key])
    }
  })

  return serialized
}
