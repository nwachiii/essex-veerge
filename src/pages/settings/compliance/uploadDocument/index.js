import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useRouter} from 'next/router';
import {UploadDocument2} from '../../../../components/common/uploadDocuments';
import {updateComplianceDocs, updateDocument} from '../../../../apis/settings';

export default function UploadDocumentInSettings() {
  const router = useRouter();

  const {mutate, isLoading} = useMutation(
    formData => {
      return updateComplianceDocs(formData);
    },
    {
      onSuccess: res => {
        console.log('Document updated', res);
        router.back(-1);
      },
      onError: err => {
        console.log(err);
      },
    }
  );

  return (
    <div>
      <UploadDocument2 onUpload={mutate} isLoading={isLoading} />
    </div>
  );
}
