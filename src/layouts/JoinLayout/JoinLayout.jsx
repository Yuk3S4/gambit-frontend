import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { map } from 'lodash'
import { Container, Icon } from 'semantic-ui-react'

import { useAuth } from '@/hooks'
import styles from './JoinLayout.module.scss'
import { Logo } from '@/components/layout'
import { data } from './JoinLayout.data'

export const JoinLayout = (props) => {

    const { children } = props
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if ( user ) router.push("/")      
    }, [])

    if ( user ) return null

    return (
        <Container className={ styles.container }>
            <Logo />

            <div>
                <div className={ styles.left }>
                    {
                        map( data, (item, index) => (
                            <div key={index}>
                                <Icon name={ item.icon } />
                                <div>
                                    <h3>{ item.title }</h3>
                                    <span>{ item.description }</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={ styles.right }>
                    { children }
                </div>
            </div>            
        </Container>
    )
}
