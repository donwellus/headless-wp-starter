import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Preview extends Component {
    static async getInitialProps(context) {
        const { id, wpnonce } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/post/preview?id=${id}&_wpnonce=${wpnonce}`,
            { credentials: 'include' }
        );
        console.log ( `${Config.apiUrl}/wp-json/postlight/v1/post/preview?id=${id}&_wpnonce=${wpnonce}` );
        const post = await res.json();
        return { post };
    }

    render() {
        console.log( this.props.post ) ;
        if (!this.props.post.title) return <Error statusCode={404} />;

        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{this.props.post.title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.props.post.content.rendered
                    }}
                />
            </Layout>
        );
    }
}

export default PageWrapper(Preview);
