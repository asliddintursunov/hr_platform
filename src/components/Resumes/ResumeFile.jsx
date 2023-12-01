import { Button } from "@radix-ui/themes"
import styles from "../../styles/ResumeDetails.module.css"
import { Cross1Icon, DownloadIcon } from "@radix-ui/react-icons"
import { Document, pdfjs, Page } from "react-pdf"
import { useEffect, useState } from "react"

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString()

function ResumeFile({ resume, setOpenResume }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState(null)
  const [resumeHeight, setResumeHeight] = useState(600)

  const [showDocument, setShowDocument] = useState(true)
  function onPassword(callback, reason) {
    function callbackProxy(pswrd) {
      // Cancel button handler
      if (pswrd === null) {
        // password will be null if user clicks on cancel, you should unmount the Document and show custom message, eg:  failed to load  PDF and button with try again
        setShowDocument(false)
      }

      callback(pswrd)
    }

    switch (reason) {
      case 1: {
        const password = prompt("Enter the password to open this PDF file.")
        if (password === null || password === "") setShowDocument(false)
        else callbackProxy(password)
        break
      }
      case 2: {
        const password = prompt("Invalid password. Please try again.")
        if (password === null || password === "") setShowDocument(false)
        else callbackProxy(password)
        break
      }
      default:
    }
  }

  useEffect(() => {
    onresize = (event) => {
      if (event.target.innerWidth >= 1745 && event.target.innerWidth < 1920) setResumeHeight(600)
      if (event.target.innerWidth >= 1920 && event.target.innerWidth < 2133) setResumeHeight(650)
      if (event.target.innerWidth >= 2133 && event.target.innerWidth < 2400) setResumeHeight(700)
      if (event.target.innerWidth >= 2400) setResumeHeight(850)
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  // function onError(error) {
  //   setError('Failed to load the PDF. Please try again.');
  // };

  function handleDownloadFile() {
    const link = document.createElement("a")
    link.href = resume
    link.target = "_blank"
    link.download = resume
    link.click()
  }

  return (
    <div className={styles.ResumeFileBackdrop}>
      <div className={`${styles.ResumeFileContainer}`}>
        <p>Resume</p>
        {!showDocument ? (
          <>
            <Button color="gray" variant="outline" onClick={() => setShowDocument(true)}>
              Reload PDF with password
            </Button>
          </>
        ) : (
          <>
            <Document
              file={resume}
              onLoadSuccess={onDocumentLoadSuccess}
              onPassword={onPassword}
              // onError={onError}
            >
              <Page height={resumeHeight} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
              <Button onClick={handleDownloadFile}>
                Download <DownloadIcon />
              </Button>
            </Document>
          </>
        )}
        <Button color="red" className={styles.closeResumeBtn} onClick={() => setOpenResume(false)}>
          <Cross1Icon />
        </Button>
      </div>
    </div>
  )
}

export default ResumeFile
{
  /* {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return <Page
                height={600}
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false} />
            })} */
}
