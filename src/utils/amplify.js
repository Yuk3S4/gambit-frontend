import { Amplify } from 'aws-amplify'

export const initAmplify = () => {
    Amplify.configure({
        aws_cognito_region: "us-east-1",
        aws_user_pools_id: "us-east-1_56Hva7FmG",
        aws_user_pools_web_client_id: "6dlj488l8h4ctb7o9klljh54ee",
        aws_cognito_identity_pool_id: "us-east-1:13644724-eb2c-4f05-9599-73cb08b4a62b"
    })
}