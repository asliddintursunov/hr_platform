import { Text } from "@radix-ui/themes"

function DeleteProfileImageModal({ setImgFallback, setSelectedImage, usernameValue, setOpenDeleteImageModal, openDeleteImageModal }) {
  const handleRemoveProfilePhoto = () => {
    setOpenDeleteImageModal(false)
    const fallback = usernameValue.charAt(0).toUpperCase()
    setImgFallback(fallback)
    setSelectedImage(null)
  }
  return (
    <>
      {openDeleteImageModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div>
              <div className="modal-description">
                <Text>Are you absolutely sure?</Text>
              </div>
              <div className="modal-description-2">
                <Text>This action cannot be undone. Your profile photo will be removed</Text>
              </div>
              <div className="modal-options">
                <button onClick={() => setOpenDeleteImageModal(false)} className="Button red">
                  Cancle
                </button>
                <button onClick={() => handleRemoveProfilePhoto()} className="Button green">
                  Yes, remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteProfileImageModal
