import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from '../App'
import { v4 as uuidV4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({
    onSubmit,
    onAddTag,
    availableTags,
    title = '',
    markdown = '',
    tags = [],
}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)

    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })
        navigate('..')
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={titleRef}
                                type='text'
                                required
                                defaultValue={title}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                onCreateOption={(label) => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags((prev) => [...prev, newTag])
                                }}
                                options={availableTags.map((tag) => ({
                                    label: tag.label,
                                    value: tag.id,
                                }))}
                                value={selectedTags.map((t) => {
                                    return {
                                        label: t.label,
                                        value: t.id,
                                    }
                                })}
                                // * This onChange will trigger when user choose one from existing option value
                                onChange={(tags) => {
                                    setSelectedTags(
                                        tags.map((t) => {
                                            return {
                                                label: t.label,
                                                id: t.value,
                                            }
                                        })
                                    )
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        ref={markdownRef}
                        defaultValue={markdown}
                        as='textarea'
                        required
                        rows={15}
                    />
                </Form.Group>
            </Stack>
            <Stack
                direction='horizontal'
                gap={2}
                className='mt-3 justify-content-end'
            >
                <Button
                    variant='primary'
                    type='submit'
                >
                    Save
                </Button>
                <Button
                    variant='outline-dark'
                    type='reset'
                >
                    Cancel
                </Button>
            </Stack>
        </Form>
    )
}

export default NoteForm
