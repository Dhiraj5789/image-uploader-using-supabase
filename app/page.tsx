"use client";

import "./App.css";
import { createClient } from "@/utils/supabase/client";
import { Fragment, useEffect, useState } from "react";

export default function Profile() {
  const [media, setMedia] = useState([]);

  const supabase = createClient();
  const bucket = "image-uploader-bucket";

  async function getMedia() {
    const { data, error } = await supabase.storage.from(bucket).list();
    if (data) {
      setMedia(data as any);
    } else {
      console.log("Error: ", error);
    }
  }

  async function uploadImage(e: any) {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(e.target.files[0].name, file);

    if (data) {
      getMedia();
    } else {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <section>
      <h1 className="heading">Picture Storage ŵ Supabase & Next.js</h1>
      <div className="imageUploadContainer">
        <p>Upload your image here</p>
        <input
          type="file"
          onChange={(e) => uploadImage(e)}
          accept="image/png, image/jpeg"
        />
      </div>

      <div className="imagesContainer">
        {media.map((media: any) => {
          return (
            <Fragment key={media.name}>
              <img
                src={`https://asilsdsihhitmflrxnmr.supabase.co/storage/v1/object/public/image-uploader-bucket/${media.name}`}
                height={300}
                width={300}
                alt={media.name}
              />
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
