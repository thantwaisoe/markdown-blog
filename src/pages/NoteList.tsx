import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import NoteCard from '../components/NoteCard'
import { Note, RawNote, Tag } from "../App"
import { useMemo, useState } from "react"
import EditTagModal from "../components/EditTagModal"

type NoteListProps = {
    availableTags: Tag[],
    notes: Note[],
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
    setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>
}

const NoteList = ({ availableTags, notes, setNotes, setTags }: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const [showModal, setShowModal] = useState<boolean>(false)

    const hideModal = () => setShowModal(false)

    const filterNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === '' ||
                note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) && (
                    selectedTags.length === 0 ||
                    selectedTags.every(tag =>
                        note.tags.some(noteTag => noteTag.id === tag.id))
                )
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1>Note</h1>
                </Col>
                <Col xs='auto'>
                    <Stack direction="horizontal" gap={3}>
                        <Link to='/new'>
                            <Button variant="primary">Create Note</Button>
                        </Link>
                        <Button onClick={() => setShowModal(true)} variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect

                                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}

                                value={selectedTags.map(t => {
                                    return {
                                        label: t.label,
                                        value: t.id
                                    }
                                })}
                                // * This onChange will trigger when user choose one from existing option value
                                onChange={
                                    (tags) => {
                                        setSelectedTags(tags.map(t => {
                                            return {
                                                label: t.label,
                                                id: t.value
                                            }
                                        }))
                                    }
                                }
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {/* Showing filtering result */}
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {
                    filterNotes.map(note => {
                        return (
                            <Col key={note.id}>
                                <NoteCard id={note.id} title={note.title} tags={note.tags} />
                            </Col>
                        )
                    })
                }
            </Row>
            <EditTagModal show={showModal} handleOnHide={hideModal} allTags={availableTags} setTags={setTags} />
        </>
    )
}

export default NoteList
