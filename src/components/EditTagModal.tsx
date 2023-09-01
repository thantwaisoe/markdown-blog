import { Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { RawNote, Tag } from "../App"

type EditTagModalProps = {
    show: boolean,
    allTags: Tag[],
    handleOnHide: () => void,
    setTags:React.Dispatch<React.SetStateAction<Tag[]>>,
}

const EditTagModal = ({ show, handleOnHide, allTags, setTags }: EditTagModalProps) => {

    const updateTagsLabel = (id: string, label: string) => {
        setTags((prevTags) => {
            return prevTags.map(tag =>{
                if(tag.id === id) {
                    return {
                        ...tag,
                        label
                    }
                }else{
                    return tag
                }
            })
        })
    }

    const handleOnDelete = (id: string) => {
        setTags((prevTags) => {
            return prevTags.filter(tag => tag.id !== id)
        })
    }

    return (
        <div>
            <Modal show={show} onHide={handleOnHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Stack gap={3}>
                            {
                                allTags.map(tag => (
                                    <Row key={tag.id} className="justify-content-center align-items-center" >
                                        <Col>
                                            <Form.Group>
                                                <Form.Control type="text" defaultValue={tag.label} 
                                                onChange={(e) => 
                                                    updateTagsLabel(tag.id ,e.target.value)
                                                }/>
                                            </Form.Group>
                                        </Col>
                                        <Col role="button" onClick={() => handleOnDelete(tag.id)} xs='auto'>&times;</Col>
                                    </Row>
                                ))
                            }
                        </Stack>


                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditTagModal
