import { fn } from "@/utils"
import { useEffect, useState } from "react"
import { Icon, Image, Table } from "semantic-ui-react"

const NOT_FOUND_IMAGE = "/assets/not-found.jpg"

export const User = ({ user }) => {

    const [avatar, setAvatar] = useState(NOT_FOUND_IMAGE)
    const isAdmin = user.userStatus === 0

    useEffect(() => {
        const imageUrl = fn.getUrlImage( user.userUUID )

        fn.checkImageExists( imageUrl, ( exists ) => {
            if ( exists ) setAvatar(imageUrl)
        })
    }, [ user ])
    

  return (
    <>
        <Table.Cell width={1}>
            <Image 
                src={ avatar }
                alt={ user.userEmail }
                avatar
            />
        </Table.Cell>

        <Table.Cell>{ user.userEmail }</Table.Cell>
        <Table.Cell>
            <Icon 
                name={ isAdmin ? 'check': 'close' }
                color={ isAdmin ? 'green': 'red' }
            />
        </Table.Cell>
    </>
  )
}
