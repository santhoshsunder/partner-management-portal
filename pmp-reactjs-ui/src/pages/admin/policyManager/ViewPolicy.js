import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../../common/Title';
import { bgOfStatus, formatDate, getPolicyManagerUrl, getStatusCode, handleServiceErrors, isLangRTL } from '../../../utils/AppUtils';
import { getUserProfile } from '../../../services/UserProfileService';
import fileUploadBlue from '../../../svg/file_upload_blue_icon.svg';
import previewIcon from "../../../svg/preview_icon.svg";
import somethingWentWrongIcon from '../../../svg/something_went_wrong_icon.svg'
import { HttpService } from '../../../services/HttpService';
import ErrorMessage from '../../common/ErrorMessage';
import LoadingIcon from '../../common/LoadingIcon';

function ViewPolicy() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isLoginLanguageRTL = isLangRTL(getUserProfile().langCode);
    const [errorCode, setErrorCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [dataLoaded, setDataLoaded] = useState(true);
    const [unexpectedError, setUnexpectedError] = useState(false);
    const [viewDetails, setViewDetails] = useState(true);
    const [viewPolicyPageHeaders, setViewPolicyPageHeaders] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem('selectedPolicyData');
        
        if (!data) {
            setUnexpectedError(true);
            return;
        }
        const viewData = JSON.parse(data);
        setViewPolicyPageHeaders(viewData);

        const fetchData = async () => {
            setDataLoaded(false);
            try {
                const response = await HttpService.get(getPolicyManagerUrl(`/policies/${viewData.policyId}`, process.env.NODE_ENV));
                if (response) {
                    const responseData = response.data;
                    if (responseData && responseData.response) {
                        const resData = responseData.response;
                        console.log(resData);
                        
                        setViewDetails(resData);
                    }
                    else {
                        handleServiceErrors(responseData, setErrorCode, setErrorMsg);
                    }
                }
                setDataLoaded(true);
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        };
        fetchData();
    }, []);

    const moveBackToList = () => {
        navigate(viewPolicyPageHeaders.backLink);
    };

    const cancelErrorMsg = () => {
        setErrorMsg("");
    };

    return (
        <>
            <div className={`mt-2 w-[100%] ${isLoginLanguageRTL ? "mr-28 ml-5" : "ml-28 mr-5"} font-inter overflow-x-scroll`}>
                {!dataLoaded && (
                    <LoadingIcon />
                )}
                {dataLoaded && (
                    <>
                        {errorMsg && (
                            <ErrorMessage errorCode={errorCode} errorMessage={errorMsg} clickOnCancel={cancelErrorMsg} />
                        )}
                        <div className="flex-col mt-7">
                            <div className="flex justify-between mb-5">
                                <Title title={viewPolicyPageHeaders.header} subTitle={viewPolicyPageHeaders.subTitle} backLink={viewPolicyPageHeaders.backLink} />
                            </div>
                            {unexpectedError && (
                                <div className={`bg-[#FCFCFC] w-full mt-3 rounded-lg shadow-lg items-center`}>
                                    <div className="flex items-center justify-center p-24">
                                        <div className="flex flex-col justify-center items-center">
                                            <img className="max-w-60 min-w-52 my-2" src={somethingWentWrongIcon} alt="" />
                                            <p className="text-sm font-semibold text-[#6F6E6E] py-4">{t('devicesList.unexpectedError')}</p>
                                            <button onClick={viewPolicyPageHeaders.backLink} type="button"
                                                className={`w-32 h-10 flex items-center justify-center font-semibold rounded-md text-sm mx-8 py-3 bg-tory-blue text-white`}>
                                                {t('commons.goBack')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!unexpectedError && (
                                <div className="bg-snow-white h-fit mt-1 rounded-t-xl shadow-lg font-inter">
                                    <div className="flex justify-between px-7 pt-3 border-b max-[450px]:flex-col">
                                        <div className="flex-col">
                                            <p className="font-bold text-md text-dark-blue mb-2">
                                                {viewDetails.policyName}
                                            </p>
                                            <div className="flex items-center justify-start mb-2 max-[400px]:flex-col max-[400px]:items-start">
                                                <div className={`${bgOfStatus(viewDetails.isActive ? 'ACTIVE' : 'INACTIVE', t)} flex w-fit py-1 px-5 text-xs rounded-md my-2 font-semibold`}>
                                                    {getStatusCode(viewDetails.isActive ? 'ACTIVE' : 'INACTIVE', t)}
                                                </div>
                                                <div className={`font-semibold ${isLoginLanguageRTL ? "mr-1" : "ml-3"} text-sm text-dark-blue`}>
                                                    {t("viewDeviceDetails.createdOn") + ' ' +
                                                        formatDate(viewDetails.cr_dtimes, "date", false)
                                                    }
                                                </div>
                                                <div className="mx-1 text-gray-300">|</div>
                                                <div className="font-semibold text-sm text-dark-blue">
                                                    {formatDate(viewDetails.cr_dtimes, "time", false)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${isLoginLanguageRTL ? "pr-8 ml-8" : "pl-8 mr-8"} pt-3 mb-2`}>
                                        <div className="flex flex-wrap py-2 max-[450px]:flex-col">
                                            <div className="w-[50%] max-[600px]:w-[100%] mb-3">
                                                <p className="font-[600] text-suva-gray text-xs">
                                                    {t("viewAuthPoliciesList.policyId")}
                                                </p>
                                                <p className="font-[600] text-vulcan text-sm">
                                                    {viewDetails.policyId}
                                                </p>
                                            </div>
                                            <div className="mb-3 max-[600px]:w-[100%] w-[50%]">
                                                <p className="font-[600] text-suva-gray text-xs">
                                                    {t("viewAuthPoliciesList.policyGroup")}
                                                </p>
                                                <p className="font-[600] text-vulcan text-sm">
                                                    {viewDetails.policyGroupName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap py-2 max-[450px]:flex-col">
                                            <div className="w-[50%] max-[600px]:w-[100%] mb-3">
                                                <p className="font-[600] text-suva-gray text-xs">
                                                    {t("viewAuthPoliciesList.policyNameDescription")}
                                                </p>
                                                <p className="font-[600] text-vulcan text-sm">
                                                    {viewDetails.policyDesc}
                                                </p>
                                            </div>
                                            <div className="mb-3 max-[600px]:w-[100%] w-[50%]">
                                                <p className="font-[600] text-suva-gray text-xs">
                                                    {t("viewAuthPoliciesList.policyGroupDescription")}
                                                </p>
                                                <p className="font-[600] text-vulcan text-sm">
                                                    {viewDetails.policyGroupDesc}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-[3.5rem] max-[600px]:w-[100%] w-[30%]">
                                            <p className="font-[600] mb-3 text-suva-gray text-xs">
                                                {t("viewAuthPoliciesList.policyData")}
                                            </p>
                                            <div className='flex flex-wrap justify-between px-3 items-center h-[5.5rem] border-2 border-[#fedff] rounded-md bg-[#f4f6fb] '>
                                                <div className='flex items-center'>
                                                    <img src={fileUploadBlue} className="h-7" alt="" />
                                                    <p className='font-semibold text-sm mx-2'>{t('viewAuthPoliciesList.jsonFilePlace')}</p>
                                                </div>
                                                <div className='flex justify-between px-2 py-1.5 w-[6rem] bg-white border-2 border-blue-800 rounded-md hover:cursor-pointer'>
                                                    <p className='text-xs font-semibold text-blue-800'>{t('viewAuthPoliciesList.preview')}</p>
                                                    <img src={previewIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`h-px w-full bg-gray-200 border-0`} />
                                    <div className={`flex justify-end py-7 ${isLoginLanguageRTL ? "ml-8" : "mr-8"}`}>
                                        <button id="auth_Policy_view_back_btn" onClick={() => moveBackToList()} className={`h-10 w-[8rem] text-sm text-tory-blue bg-white border border-blue-800 font-semibold rounded-md text-center`}>
                                            {t("commons.goBack")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default ViewPolicy;