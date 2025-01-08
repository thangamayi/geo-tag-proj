import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Contact.css";
import clgLogo from "../../Assets/logo_small.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Contact() {
  const location = useLocation();
  console.log(location);

  const {
    functionName = "",
    eventDate = "",
    departmentName = "",
    LayoutType = "",

    uploadedImages = [],
  } = location.state || {}; // Retrieve data from state

  const [isImagesLoaded, setIsImagesLoaded] = useState(true);

  // Check if all images are loaded
  useEffect(() => {
    if (uploadedImages.length === 0) {
      setIsImagesLoaded(true);
    } else {
      const images = uploadedImages.map((image) => URL.createObjectURL(image));
      const imgElements = images.map((url) => {
        const img = new Image();
        img.src = url;
        return img;
      });

      Promise.all(
        imgElements.map((img) =>
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          })
        )
      )
        .then(() => {
          setIsImagesLoaded(true);
          // window.print();

          // Delay window.print until images are loaded
          setTimeout(() => {
            window.print();
          
          }, 0); // Adjust timeout if necessary
        })
        .catch((error) => console.error("Image loading error:", error));
    }
  }, [uploadedImages]);

  const generatePDF = () => {
    if (!isImagesLoaded) {
      alert("Please wait, images are still loading.");
      return;
    }

    const templateElement = document.getElementById("template");

    // Initialize jsPDF
    const pdf = new jsPDF("p", "mm", "a4");

    // Use html2canvas to capture the template element as a canvas
    html2canvas(templateElement, {
      useCORS: true, // Enable cross-origin requests for images
      scrollX: 0,
      scrollY: -window.scrollY, // Prevent scroll issues in large content
      width: templateElement.offsetWidth, // Ensure full width is captured
      height: templateElement.offsetHeight, // Ensure full height is captured
      x: 0,
      y: 0,
    }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");

      // A4 paper dimensions (in mm)
      const a4Width = 210;  // Width of A4 paper in mm
      const a4Height = 297; // Height of A4 paper in mm
      const margin = 10;  // Margin for the PDF content

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate scaling ratio to fit the canvas within the A4 dimensions
      const ratio = Math.min(a4Width / canvasWidth, a4Height / canvasHeight);
      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;

      // Add the image to the PDF with the calculated width and height
      pdf.addImage(imageData, "PNG", margin, margin, imgWidth, imgHeight);

      // Save the PDF with a custom filename
      pdf.save("event_details.pdf");
    });
  };

  const renderLayout = () => {
    const defaultLContent = (
      <div>
        <div className="doc-header" id="template">
          <div className="head-logo">
            <img src={clgLogo} alt="College Logo" className="clg-logo" />
          </div>
          <div className="text-section">
            <h2>{departmentName}</h2>
            <h3>ARUL ANANDAR COLLEGE (AUTONOMOUS)</h3>
            <p>Reaccredited by NAAC at A Grade</p>
            <p>Karumathur-625 514, Madurai Dt.</p>
          </div>
        </div>

        <div className="information">
          <p>Date: {eventDate}</p>
          <h4 className="Functiontitle">{functionName}</h4>
        </div>

        <div className="image-Container">
          {uploadedImages.map((image, index) => (
            <div key={index} className="image-holder">
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="priview-images"
              />
            </div>
          ))}
        </div>
      </div>
    );

    const flexContent = (
      <div>
        <div className="doc-header" id="template">
          <div className="head-logo">
            <img src={clgLogo} alt="College Logo" className="clg-logo" />
          </div>
          <div className="text-section">
            <h2>{departmentName}</h2>
            <h3>ARUL ANANDAR COLLEGE (AUTONOMOUS)</h3>
            <p>Reaccredited by NAAC at A Grade</p>
            <p>Karumathur-625 514, Madurai Dt.</p>
          </div>
        </div>

        <div className="information">
          <p>Date: {eventDate}</p>
          <h4 className="Functiontitle">{functionName}</h4>
        </div>

        <div className="image-Container">
          {uploadedImages.map((image, index) => (
            <div key={index} className="flex-holder">
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="priview-images"
              />
            </div>
          ))}
        </div>
      </div>
    );
// -------my code develepment-------

const roundcontent = (
  <div>
    <div className="doc-header" id="template">
      <div className="head-logo">
        <img src={clgLogo} alt="College Logo" className="clg-logo" />
      </div>
      <div className="text-section">
        <h2>{departmentName}</h2>
        <h3>ARUL ANANDAR COLLEGE (AUTONOMOUS)</h3>
        <p>Reaccredited by NAAC at A Grade</p>
        <p>Karumathur-625 514, Madurai Dt.</p>
      </div>
    </div>

    <div className="information">
      <p>Date: {eventDate}</p>
      <h4 className="Functiontitle">{functionName}</h4>
    </div>

    <div className="image-Container">
      {uploadedImages.map((image, index) => (
        <div key={index} className="round-holder">
          <img
            src={URL.createObjectURL(image)}
            alt={`Uploaded Image ${index + 1}`}
            className="priview-images"
          />
        </div>
      ))}
    </div>
  </div>
);

// code end......
    if (LayoutType === "DefaultLayout") {
      return (
        <div id="printingElement" className="preview-content">{defaultLContent}</div>
      );
    }

    if (LayoutType === "FlexLayout") {
      return (
        <div id="printingElement" className="preview-content">{flexContent}</div>
      );
    }

    if (LayoutType === "RoundLayout") {
      return (
        <div id="printingElement" className="preview-content">{roundcontent}</div>
      );
    }

    return null; // If LayoutType is undefined or doesn't match either layout
  };

  return <div>{renderLayout()}</div>;
}

export default Contact;
