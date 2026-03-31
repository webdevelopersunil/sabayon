<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SahayogStatusUpdationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $fromUser;
    public $toUser;
    public $subjectLine;
    public $tagline;
    public $data;

    /**
     * Create a new message instance.
     */
    public function __construct($fromUser, $toUser, $subjectLine, $tagline, $data = [])
    {
        $this->fromUser    = $fromUser;
        $this->toUser      = $toUser;
        $this->subjectLine = $subjectLine;
        $this->tagline     = $tagline;
        $this->data        = $data;
    }
    

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sahayog Status Updation Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.sahayog-update-status',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
