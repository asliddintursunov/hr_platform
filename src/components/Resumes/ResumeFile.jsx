import { Button } from "@radix-ui/themes"
import styles from "../../styles/ResumeDetails.module.css"
import { Cross1Icon } from "@radix-ui/react-icons"
import { Document, pdfjs, Page } from "react-pdf"
import { useEffect, useState } from "react"

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString()

function ResumeFile({ resume, setOpenResume }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState(null);
  const [resumeHeight, setResumeHeight] = useState(600)

  useEffect(() => {
    onresize = (event) => {
      console.log(event.target.innerWidth);
      if (event.target.innerWidth >= 1745 && event.target.innerWidth < 1920) setResumeHeight(600)
      if (event.target.innerWidth >= 1920 && event.target.innerWidth < 2133) setResumeHeight(650)
      if (event.target.innerWidth >= 2133 && event.target.innerWidth < 2400) setResumeHeight(700)
      if (event.target.innerWidth >= 2400) setResumeHeight(850)
    }
  }, [])


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  function onPassword(callback) {
    const userEnteredPassword = prompt('Please enter the password to view this PDF.')
    if (userEnteredPassword === null || userEnteredPassword === '') return;
    callback(userEnteredPassword)
  }

  function onError(error) {
    console.error('Error loading PDF:', error);
    setError('Failed to load the PDF. Please try again.');
  };

  console.log(resume)
  return (
    <div className={styles.ResumeFileBackdrop}>
      <div className={`${styles.ResumeFileContainer}`}>
        <p>
          Resume
        </p>
        <Document
          file={resume}
          onLoadSuccess={onDocumentLoadSuccess}
          onPassword={onPassword}
          onError={onError}
        >
          {/* {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return <Page
                height={600}
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false} />
            })} */}
          <Page
            height={resumeHeight}
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false} />
        </Document>
        <Button color="red" onClick={() => setOpenResume(false)}>
          <Cross1Icon />
        </Button>
      </div>
    </div>
  )
}

export default ResumeFile
