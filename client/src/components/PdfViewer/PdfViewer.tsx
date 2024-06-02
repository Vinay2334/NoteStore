import { Box, Stack, Button, Typography, styled, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Document as BaseDocument, Page, pdfjs } from "react-pdf";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function PdfViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showPageNumber, setShowPageNumber] = useState<boolean>(false);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const goToPrevPage = () =>
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages || prevPage));

  return (
    <Box
      position="relative"
      width="fit-content"
      onMouseEnter={() => setShowPageNumber(true)}
      onMouseLeave={() => setShowPageNumber(false)}
      maxHeight={600}
    >
      {/* <Paper> */}
      <Document file="/samplepdf.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          width={400}
          height={500}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          pageNumber={pageNumber}
        />
      </Document>
      {/* </Paper> */}
      {showPageNumber && (
        <Stack
          position="absolute"
          direction="row"
          justifyContent="center"
          gap={2}
          alignItems="center"
          borderRadius="2px"
          padding="3px"
          sx={{
            left: "0",
            right: "0",
            bottom: "4rem",
            margin: "0 auto",
            backgroundColor: "white",
            width: "fit-content",
          }}
        >
          <KeyboardArrowLeftIcon
            onClick={goToPrevPage}
            fontSize="small"
            sx={{ color: pageNumber <= 1 ? "grey" : "" }}
          />

          <Typography fontSize={18} align="center" zIndex={1}>
            {pageNumber} of {numPages}
          </Typography>
          <KeyboardArrowRightIcon
            fontSize="small"
            onClick={goToNextPage}
            sx={{ color: pageNumber >= (numPages || 1) ? "grey" : "" }}
          />
        </Stack>
      )}
    </Box>
  );
}

export default PdfViewer;

const Document = styled(BaseDocument)({});
