import React from 'react'
import { Tag } from '../App'
import styles from '../NoteList.module.css'
import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
type NoteCardProps = {
  tags: Tag[],
  title: string,
  id: string
}

const NoteCard = ({ tags, title, id }: NoteCardProps) => {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className='align-items-center justify-content-conter h-100'>
          <span className='fs-5'>{title}</span>
          {tags.length > 0 && (
            <Stack className='justify-content-center flex-wrap' gap={1} direction='horizontal'>
              {tags.map(t => (
                <Badge key={t.id} className='text-truncates'>
                  {t.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
