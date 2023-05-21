import React, { useState, useEffect, useRef } from 'react'
import ImageMedia from '../profile/imageMedia'

function ReturnMedia({ media }) {
    const videoRef = useRef()
    function displayUploaded(file) {
        if (file && file.type.includes("image")) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setSource(e.target.result);
            };

            reader.readAsDataURL(file);
        }
        else if(file && file.type.includes("video")) {
            console.log("video")
            setSource(URL.createObjectURL(file))
        }
    }

    const [source, setSource] = useState<string | ArrayBuffer>("");

    useEffect(() => {
        displayUploaded(media);
    }, [media]);
    return (
        media ?
        (media.type.includes("image") ?
        <div className="relative h-[140px]">
            <img src={source as string} className="w-full h-full object-cover" alt="" />
        </div>:
        media.type.includes("video") ? 
        <video src={source as string} className="w-full h-full object-cover" controls>
        </video>
        : null)
        : null

    )
}

export default ReturnMedia