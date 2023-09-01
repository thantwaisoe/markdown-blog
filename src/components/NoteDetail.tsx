import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { useNote } from '../pages/NoteLayout'
import { Link } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { RawNote } from '../App'

type NoteDetailProps = {
    setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>
}

const NoteDetail = ({ setNotes }: NoteDetailProps) => {
    const note = useNote()

    const handleOnDelete = (id: string): void => {
        setNotes((preNotes) => preNotes.filter((note) => note.id !== id))
    }

    return (
        <>
            <Row className='justify-content-center align-items-center mb-5'>
                <Col>
                    <h1 className='mb-2'>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            direction='horizontal'
                            gap={2}
                        >
                            {note.tags.map((n) => (
                                <Badge key={n.id}>{n.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs='auto'>
                    <Stack
                        direction='horizontal'
                        gap={3}
                    >
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='primary'>Edit</Button>
                        </Link>
                        <Button
                            onClick={() => handleOnDelete(note.id)}
                            variant='outline-danger'
                        >
                            Delete
                        </Button>
                        <Link to='/'>
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}

export default NoteDetail
