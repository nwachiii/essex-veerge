import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useRouter} from 'next/router';
import {UploadDocument2} from '../../../../components/common/uploadDocuments';
import {updateDocument} from '../../../../apis/settings';
import {SwalError} from '../../../../ui-lib/ui-lib.components';

export default function UploadDocumentInProfile() {
  const router = useRouter();

  const {mutate, isLoading} = useMutation(
    formData => {
      return updateDocument(formData);
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
      <UploadDocument2 onUpload={mutate} isLoading={isLoading} type={'profile'} />
    </div>
  );
}
