<script lang="ts">
  import { Card, Container, Col, Row, CardHeader, CardTitle, CardBody, CardText, Button, Form, FormGroup, Input } from "sveltestrap"
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  if (browser) {
    if (localStorage.getItem('name')) {
      window.location.href = '/my'
    }
  }
</script>
<Container fluid class="main-container">
  <Row class="align-items-center main-row">
    <Col class="col-sm-1 col-md-6 offset-md-3">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle>追加情報画面</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>この度はご登録ありがとうございます。追加情報をご登録ください。</CardText>
          <form method="POST" action="?/continue">
            <FormGroup floating label="氏名">
              <Input type="text" name="name" value="{$page.data.name}" required />
            </FormGroup>
            <FormGroup floating label="住所">
              <Input type="text" name="address" value="{$page.data.address}" required />
            </FormGroup>
            <input type="hidden" name="userId" value="{$page.data.userId}" />
            <input type="hidden" name="continueUri" value="{$page.data.continueUri}" />
            <input type="hidden" name="state" value="{$page.data.state}" />
            <Button>登録</Button>
          </form>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>
<style lang="scss">
  :global(.main-container) {
    height: 100vh;
  }
  :global(.main-row) {
    height: 100%;
  }
</style>