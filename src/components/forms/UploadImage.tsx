import { imageUpload } from "@/utils/Cloudinary";
import { getErrorMessageByPropertyName } from "@/utils/SchemaValidator";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Typography, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

type ImageUploadProps = {
  name: string;
};

const UploadImage = ({ name }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { setValue, formState: {errors, } , clearErrors } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
   
    if (info.file.status === "uploading") {
        setLoading(true);
      const res = await imageUpload(info.file.originFileObj);
      if (res) {
        handleAction(res, info.file.originFileObj);
      }
   
      return;
    }
    if (info.file.status === "error") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      console.log("ok");
      setLoading(false);
      return;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleAction = async (file: any, obj: any) => {
    setValue(name, file);
    getBase64(obj as RcFile, (url) => {
      setLoading(false);
       clearErrors("avatar")
      setImageUrl(url);
    });
  };

  return (
    <>
       <div className="flex flex-col justify-center items-center">
      <Upload
        name={name}
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={() => {}}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="avatar"
            style={{ width: "100%", height: "100px",  }}
            className="rounded-full"
            width={100}
            height={100}
          />
        ) : (
          uploadButton
        )}
      </Upload>
 
    {errorMessage && (
        <Typography.Paragraph type="danger">
          {errorMessage}
        </Typography.Paragraph>
      )}
    </div>
    </>
  );
};

export default UploadImage;
